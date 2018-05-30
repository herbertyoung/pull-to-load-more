var path = require('path');

module.exports = {
  entry: {
    PullToLoadMore: './src/PullToLoadMore.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
    library: 'PullToLoadMore',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: {
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      }
    }]
  }
};