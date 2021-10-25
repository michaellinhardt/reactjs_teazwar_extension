const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// defines where the bundle file will live
const bundlePath = path.resolve(__dirname, 'dist/')

const addEntryPoint = (label, outputHtml, build = true) => ({
  [label]: {
    path: `./entry/${label}.entry.js`,
    outputHtml,
    build,
  },
})

module.exports = (_env, argv) => {

  const entryPoints = {
    ...addEntryPoint('VideoComponent', 'video_component.html'),
    ...addEntryPoint('VideoOverlay', 'video_overlay.html'),
    ...addEntryPoint('Panel', 'panel.html'),
    ...addEntryPoint('Config', 'config.html'),
    ...addEntryPoint('LiveConfig', 'live_config.html'),
    ...addEntryPoint('Mobile', 'mobile.html'),
  }

  const entry = {}

  // edit webpack plugins here!
  const plugins = [
    // new CleanWebpackPlugin(['dist']),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development')
    // }),
  ]

  for (const entryPoint in entryPoints) {
    if (entryPoints[entryPoint].build) {
      entry[entryPoint] = entryPoints[entryPoint].path
      if (argv.mode === 'production') {
        plugins.push(new HtmlWebpackPlugin({
          inject: true,
          chunks: [entryPoint],
          template: './template.html',
          filename: entryPoints[entryPoint].outputHtml,
        }))
      }
    }
  }

  const config = {

    // entry points for webpack- remove if not used/needed
    entry,
    optimization: {

      // this setting is default to false to pass review more easily.
      // you can opt to set this to true to compress the bundles,
      // but also expect an email from the review team to get the full source otherwise.
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // {
        //   test: /\.scss$/,
        //   use: [
        //       "style-loader", // creates style nodes from JS strings
        //       "css-loader", // translates CSS into CommonJS
        //       "sass-loader", // compiles Sass to CSS, using Node Sass by default
        //   ]
        // },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
          },
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      filename: '[name].bundle.js',
      path: bundlePath,
    },
    plugins,

  }

  if (argv.mode === 'development') {
    config.devServer = {
      static: path.join(__dirname, 'public'),
      host: argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      webSocketServer: 'ws',
      port: 8080,
      https: true,
    }
  }
  if (argv.mode === 'production') {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: false,
        },
      },
      name: false,
    }
  }

  return config
}
