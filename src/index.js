/**
 * Ars Arsenal
 * A gallery picker
 */

/**
 * All necessary polyfills
 */
require('./patch')

/**
 * Style information compiled via Webpack
 */
require('style/ars-arsenal')

var React = require('react')
var Ars   = require('./components/ars')

module.exports = function(selector, options) {
  var el = document.querySelector(selector)

  React.render(<Ars options={ options } />, el)
}