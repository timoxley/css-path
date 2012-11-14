var csspath = require('css-path')
var domify = require('component-domify')
var assert = require('timoxley-assert')

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
  var dom = domify('<div><p></p></div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports nested elements', function() {
  var dom = domify('<p><strong></strong></p>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports elements with a class', function() {
  var dom = domify('<div><div class="container"></div></div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports elements with multiple classes', function() {
  var dom = domify('<div><div class="container page"></div></div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports elements with an id', function() {
  var dom = domify('<div><h1 id="title">Title</h1></div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports elements with an id and classes', function() {
  var dom = domify('<div><h1 id="title" class="big red">Title</h1><div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports nested elements with an id and classes', function() {
  var dom = domify('<div class="header"><h1 id="title" class="big red">Title</h1></div>')
  var el = dom.children[0]
  var path = csspath(el)
  assert.strictEqual(el, dom.querySelector(path))
})

it('supports body classes', function() {
  var body = [
  '<body class="page">',
    '<div class="container">',
      '<p><span id="target"></span></p>',
    '</div>',
  '</body>'
  ].join('')
  var dom = domify(body)
  var el = dom.querySelector('#target')
  var path = csspath(el)
  assert.ok(el === dom.querySelector(path))
})

