"use strict"

require('babel-register')({
  presets: [ 'es2015' ],
  // whitelist: [
  //   'es6.classes',
  //   'es6.destructuring',
  //   'es6.objectSuper',
  //   'es6.parameters',
  //   'es6.properties.computed',
  //   'es6.properties.shorthand',
  //   'es6.spread',
  //   'es6.tailCall',
  //   'es6.templateLiterals',
  //   'es6.modules',
  //   'es6.arrowFunctions',
  //   'es7.objectRestSpread',
  //   'es7.comprehensions',
  //   'es7.exponentiationOperator',
  //   'useStrict']
});

module.exports = require('./app');
