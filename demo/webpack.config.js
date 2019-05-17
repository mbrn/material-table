const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './demo/demo.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
	  {
		test: /\.(css)$/,
		exclude: /node_modules/,
		use: ['style-loader','css-loader']
	  }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './demo',
    hot: true,
    disableHostCheck: true
  }
};
