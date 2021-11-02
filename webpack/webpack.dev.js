const fs = require('fs')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    webSocketServer: 'ws',
    historyApiFallback: true,
    static: paths.public,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    https: {
      cert: fs.readFileSync('./src/config/certificates/mkcert.cert.pem'),
      key: fs.readFileSync('./src/config/certificates/mkcert.key.pem'),
      ca: fs.readFileSync('./src/config/certificates/rootCA.pem'),
    }
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
