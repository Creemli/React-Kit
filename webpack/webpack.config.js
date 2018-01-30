import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// const uglifyjs = require('uglifyjs-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// 公共目录

const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src');

export default {
  entry: [
    'webpack-hot-middleware/client',
    APP_PATH,
  ],
  output: {
    path: path.join(ROOT_PATH, '/build/'),
    filename: 'build/[name].[hash:4].js',
    chunkFilename: 'build/chunk.[id].[hash:4].js',
    publicPath: '',
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
      'src/assets'
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
    // webpack hot middleware configuration.
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({'process.env': 'development', 'NODE_ENV': 'development'}),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(APP_PATH, 'index.html')
    }),
    new ExtractTextPlugin('build/app.[hash:4].css'),
  ],
  devtool: 'source-map',
};

export {
  ROOT_PATH,
  APP_PATH,
}