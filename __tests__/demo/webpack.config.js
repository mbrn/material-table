const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './demo.js')],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '__tests__/demo',
    hot: true,
    disableHostCheck: true,
    port: 8080,
    open: true
  }
};
