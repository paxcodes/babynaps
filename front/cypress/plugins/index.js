/**
 * START vue-loader
 * For cypress-vue-unit-test
 */
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('@cypress/webpack-preprocessor')
const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}

const optionsForWebpack = {
  webpackOptions,
  watchOptions: {}
}
/** END of `vue-loader` configuration */

/**
 * START of `cleaner stacktraces`
 * See https://github.com/cypress-io/cypress/issues/881#issuecomment-485235225
 */
const browserify = require('@cypress/browserify-preprocessor')
const optionsForBrowserify = browserify.defaultOptions
optionsForBrowserify.browserifyOptions.transform[1][1].babelrc = true
optionsForBrowserify.browserifyOptions.transform[1][1].retainLines = true

/** END of `cleaner stacktraces` */

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', webpack(optionsForWebpack))
  on('file:preprocessor', browserify(optionsForBrowserify))
}
