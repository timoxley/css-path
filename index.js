var indexOf = require('indexof')

module.exports = function cssPath(el) {
  return _cssPath(el).join(" > ").trim();
}

function _cssPath(el, path) {
  path = path || [];
  if (!el || getNodeName(el) === 'html') return path

  var elSelector = [getNodeName, getIdSelector, getClassSelector]
  .map(function(func) { return func(el) }) // apply functions
  .filter(function(item) {return !!item}) // remove non-results
  .join('').trim()

  path.unshift(elSelector)
  return _cssPath(el.parentNode, path)
}

/*
 * Get element's .class .list
 * @param {Element} dom element
 * @return {String} classes of element as CSS selector
 */
function getClassSelector(el) {
  return el.className && el.className.split(' ')
  .map(function(className) { return '.' + className })
  .join('')
}

/*
 * Get element #id
 * @param {Element} dom element
 * @return {String} id of element as CSS selector
 */
function getIdSelector(el) {
  return el.id ? '#' + el.id : ''
}

/*
 * Get element node name
 * @param {Element} dom element
 * @return {String} node name of element as CSS selector
 */
function getNodeName(el) {
  return (el.nodeName).toLowerCase()
}

function getChildIndex(el) {
  return 'nth-child('+ indexOf(el) +')'
}
