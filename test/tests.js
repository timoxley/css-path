var csspath = require('css-path')
var domify = require('component-domify')
var assert = require('component-assert')

// Bug fix wrapper for
// https://github.com/component/domify/pull/10
// Remove some time after merged.
var _domify = domify
var domify = function(html) {
  var el = _domify(html)
  if (el.parentElement) el = el.parentElement.removeChild(el)
  return el
}


it('supports single elements', function() {
  var expected = 'p'
  var el = domify('<p></p>')
  var actual = csspath(el)
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports nested elements', function() {
  var expected = 'p > strong'
  var el = domify('<p><strong></strong></p>')
  var actual = csspath(el.children[0])
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports elements with a class', function() {
  var expected = 'div.container'
  var el = domify('<div class="container"></div>')
  var actual = csspath(el)
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports elements with multiple classes', function() {
  var expected = 'div.container.page'
  var el = domify('<div class="container page"></div>')
  var actual = csspath(el)
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports elements with an id', function() {
  var expected = 'h1#title'
  var el = domify('<h1 id="title">Title</h1>')
  var actual = csspath(el)
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports elements with an id and classes', function() {
  var expected = 'h1#title.big.red'
  var el = domify('<h1 id="title" class="big red">Title</h1>')
  var actual = csspath(el)
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it('supports nested elements with an id and classes', function() {
  var expected = 'div.header > h1#title.big.red'
  var el = domify('<div class="header"><h1 id="title" class="big red">Title</h1></div>')
  var actual = csspath(el.children[0])
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

it.only('supports body classes', function() {
  //var html = [
  //'<html>',
  //'</html>'
  //].join('')
  //var head = [
    //'<head>',
      //'<title>Test</title>',
      //'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    //'</head>'
  //].join('')
  var body = [
  '<body class="page">',
    '<div class="container">',
      '<p><span id="target"></span></p>',
    '</div>',
  '</body>'
  ].join('')
  var expected = 'body.page > div.container > p > span#target'
  //var doc = domify('<html></html>')
  //doc.appendChild(domify(head))
  //doc.appendChild(domify(body))
  var actual = csspath(domify(body).querySelector('#target'))
  assert(actual === expected, '"' + actual +'" !== "' + expected + '"')
})

