const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin'); // for Android
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'); // for Service Worker

module.exports = {
  bail: true,
  devtool: 'hidden-source-map',
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'reselect',
      'redux-saga',
      'superagent'
    ],
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          compact: true
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true
              }
            }
            // 나중에 이 부분에 sass-loader 추가
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|bmp|ico|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          limit: 10000
        }
      },
      {
        loader: 'file-loader',
        exclude: [/\.js$/, /\.html$/, /\.json$/, /\.css$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Production',
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NormalModuleReplacementPlugin(
      /pages\/index\.js/,
      './index.async.js'
    ),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ie8: false,
        mangle: true,
        compress: true,
        warnings: false
      }
    })
  ]
};
