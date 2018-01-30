/**
 * 为了兼容ES6写法，使用babel命名方式
 * see http://cnodejs.org/topic/56346ee43ef9ce60493b0c96
 */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var StatsPlugin = require('stats-webpack-plugin');
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const node_modules_dir = path.resolve(ROOT_PATH, 'node_modules');

// TODO 设置路径
const src = {
  test: 'test',
  production: 'production'
};

const config = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    shared: [
      'react',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      // 'lodash/core',
      'reqwest',
      //'components',
    ]
  },
  output: {
    path: path.join(ROOT_PATH, '/dist/'),
    filename: '[name].js',
    chunkFilename: 'chunk.[id].[hash:4].js',
    //cdn host
    publicPath: src[process.env.DEV_ENV],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{loader: 'babel-loader'}]
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    },
    {
      test: /\.(png|jpg|jpeg|webp|gif|svg)/,
      use: [{
        loader: 'url-loader',
        options: {
          'limit': 500,
          outputPath: 'images/'
        }
      }]
    },
     // less 编译
     {
      test: /\.less$/,
      // 不分离编译的css文件
      // use:['style-loader',"postcss-loader",'css-loader','less-loader']
      // 分离css文件
      use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader',"postcss-loader", 'less-loader']
      })
  },
  // scss 编译
  {
      test:/\.scss$/,
      // 编译scss 不分离文件
      // use:['style-loader',"postcss-loader",'css-loader','sass-loader']
      // 分离css文件
      use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader',"postcss-loader",'sass-loader']
      })
  },
  
  ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '项目名',
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(APP_PATH, 'index.html')
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: true
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.CommonsChunkPlugin('shared'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      cache: false,
      compressor: {
        warnings: false,
        screw_ie8: false
      },
      output: {
        comments: false
      }
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // postcss: [
  //   require('autoprefixer')
  // ]
};

export default config;
