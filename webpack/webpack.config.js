import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src');

export default {
  entry: [
    'webpack-hot-middleware/client',
    APP_PATH
  ],
  output: {
    path: path.join(ROOT_PATH, '/build/'),
    filename: 'build/[name].[hash:4].js',
    chunkFilename: 'build/chunk.[id].[hash:4].js',
    publicPath: ''
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: 'style!css?sourceMap&-minimize!postcss!less'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      // use loaders when it is array. Or it comes error maybe.
      loaders: ['react-hot', 'babel'],
    }, {
      test: /\.(jpe?g|gif|png|ico|svg)$/,
      loader: 'url?limit=8192&name=build/[name].[hash:4].[ext]'
    }, {
      test: /\.(woff2?|otf|eot|ttf)$/i,
      loader: 'url?name=fonts/[name].[hash:4].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }],
    //preLoaders: [{
    //  test: /\.(js|jsx)$/,
    //  loader: 'eslint',
    //  exclude: /node_modules/
    //}]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'src/assets'
    ],
    extensions: ['', '.js', '.png']
  },
  //postcss: function() {
  //  return [
  //    require('autoprefixer'),
  //    require('precss')
  //  ]
  //},
  plugins: [
    // webpack hot middleware configuration.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(APP_PATH, 'index.html')
    }),
    new ExtractTextPlugin('build/app.[hash:4].css'),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'source-map',
  eslint: {
    configFile: `${ROOT_PATH}/.eslintrc`
  },
  ROOT_PATH,
  APP_PATH
}