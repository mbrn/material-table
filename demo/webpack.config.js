const webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./demo/demo.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./demo",
    hot: true,
    disableHostCheck: true,
  },
};
