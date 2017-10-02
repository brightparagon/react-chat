const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // entry 불러오는 순서는 이대로 해야함
  // entry에 js 파일들이 여러개 올 경우는 only-dev-server를 각각 주어야함
  // react lib 등의 js 파일들을 vendor로, 앱(src) 관련 js 파일들을 index.js로 나눠서 parallel로 불러오는 것이 빠름[chunks]
  entry: [
    'babel-polyfill',           // polyfill by babel
    'react-hot-loader/patch',   // react hot loader v3 -> used with webpack HMR
    'webpack-dev-server/client?http://localhost:8000',     // websocket으로 감지
    // 'webpack-dev-server/client?http://0.0.0.0:8000',       // localhost로 하면 외부에서 개발서버로 접근이 불가능
    'webpack/hot/only-dev-server',       // do HMR not on errors: "only" prevents reload on syntax errors
    './src/index.css',
    './src/index.js'
  ],

  // output은 src 폴더 안에 있는 react code의 빌드된 결과(bundle.js)를 놓는 곳을 지정한다
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // src안의 파일들을 번들링해서 dist 폴더에 저장한다 -> 근데 아래의 /static/ 경로를 통해 serve된다
    publicPath: '/static/'  // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'eval',  // source-map은 build(webpack compile)을 느리게 한다
  // devtool: 'inline-source-map', // from dan abramov

  // performance: { // performance tuning에 대한 힌트를 표시한다
  //   hints: 'error'
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        // loader: 'babel-loader',
        exclude: [/node_modules/]
        // options를 사용하려면 위의 loader 방식을 사용해야함
        // options: {
        //   presets: ['es2015', 'react']
        // }
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { // 이미지 파일들을 import하면 output directory로의 path값을 갖도록 한다
        test: /\.(png|svg|jpg|gif)$/,
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
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10000
      //       }
      //     }
      //   ]
      // }
    ]
  },

  plugins: [
    // new CleanWebpackPlugin(['dist']),   // compile할때마다 public 폴더를 비움
    // // This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
    // new HtmlWebpackPlugin({
    //   title: 'Development Mode'
    // }),
    // Use HMR
    new webpack.HotModuleReplacementPlugin(),
    // HRM update 때마다 브라우저 콘솔에 나오는 모듈 이름을 단순하게 표현
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // ExtractTextPlugin readme 읽어보기
    new ExtractTextPlugin('style.css'),
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // })
    new webpack.optimize.UglifyJsPlugin({   // minify the size of bundle.js
      compressor: {
        warnings: false
      }
    })
  ],

  devServer: {
    host: 'localhost',
    port: 8000,
    proxy: {  // webpack-dev-server가 웹서버 상에서 운영될때 api call의 경우 실제 서버로 request한다
      '/api/*': 'http://localhost:3000'
    },
    // contentBase: path.join(__dirname, 'dist'),        // webpack-dev-server가 serve할 파일들의 폴더 위치
    compress: true,   // enable gzip compression
    historyApiFallback: true,   // true for index.html upon 404s, object for multiple paths
    inline: true, // Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket
    hot: true,    // hot module replacement. Depends on HotModuleReplacementPlugin -> enable HMR on the SERVER!!
    overlay: true,  // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    // noInfo: true,  // cli창에 info display 없앰
    filename: 'bundle.js',
    stats: {                       // cli custom
      assets: true,           // Sort assets by a field
      children: true,         // Add chunk information
      chunks: false,          // Add built modules information to chunk information
      chunkModules: false,
      colors: true,
      performance: true,      // Show performance hint when file size exceeds `performance.maxAssetSize`
      publicPath: true,       // Add public path information
      version: true,
      hash: true,             // Add the hash of the compilation
      timings: false,
      warnings: false
    }
  }
};
