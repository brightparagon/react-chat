const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
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
          cacheDirectory: true
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // 이미지 파일들을 import하면 output directory로의 path값을 갖도록 한다
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
         'file-loader'
        ]
      },
      { // 폰트 파일들도 이미지와 마찬가지로 연결
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
         'file-loader'
        ]
      }
    ]
  },

  plugins: [
    // This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html')
    }),

    // Prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),

    // Use Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(),

    // Do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    new CaseSensitivePathsPlugin(),

    // Enable loaders to have options 
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],

  devServer: {
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api/*': 'http://localhost:3000'
    },
    // Enable gzip compression
    compress: true,
    // True for index.html upon 404s, object for multiple paths
    historyApiFallback: true,
    // Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket
    inline: true,
    // Hot module replacement. Depends on HotModuleReplacementPlugin
    hot: true,
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true,
    filename: 'static/js/bundle.js',
    // CLI custom
    stats: {
      assets: true,           // Sort assets by a field
      children: true,         // Add chunk information
      chunks: false,          // Add built modules information to chunk information
      chunkModules: false,
      colors: true,
      performance: false,     // Show performance hint when file size exceeds `performance.maxAssetSize`
      publicPath: true,       // Add public path information
      version: true,
      hash: true,             // Add the hash of the compilation
      timings: false,
      warnings: false
    }
  },

  // Performance tuning에 대한 힌트를 표시하지 않는다
  performance: {
    hints: false
  }
};