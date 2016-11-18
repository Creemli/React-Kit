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

const config = {
  cache: true,
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    shared: [
      'react',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      'lodash/core',
      'reqwest',
      //'components',
    ]
  },
  output: {
    path: path.join(ROOT_PATH, '/dist/'),
    filename: 'app.js',
    chunkFilename: 'chunk.[id].[hash:4].js',
    //cdn host
    //publicPath: 'http://wap-stg.pingan.com.cn:8010/app_js/c3/chaoshi/neon/'
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      // 'src/assets'
    ],
    extensions: ['', '.json', '.js', '.png']
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?-minimize!autoprefixer-loader!less'
      )
    }, {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }, {
      test: /\.(jp?g|gif|png|woff|ico)$/,
      loaders: ['url-loader?limit=8192&name=[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
    }]
  },
  imagemin: {
    gifsicle: {
      interlaced: false
    },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: {
      optimizationLevel: 5
    },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [{
        removeTitle: true
      }, {
        convertPathData: false
      }]
    }
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
    new webpack.optimize.CommonsChunkPlugin('shared', 'shared.js'),
    new webpack.optimize.DedupePlugin(),
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
    new webpack.optimize.OccurenceOrderPlugin(),
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
