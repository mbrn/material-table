const webpack = require("webpack");

module.exports = {
  entry: ["./demo/demo.js"], // ← remove babel-polyfill, use core-js in babel config instead
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(@mui)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-logical-assignment-operators",
            ],
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    fullySpecified: false, // ← fixes MUI ESM issue
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    // ← HotModuleReplacementPlugin removed, webpack 5 handles it natively
  ],
  devServer: {
    static: "./demo",        // ← contentBase is now static
    hot: true,
    allowedHosts: "all",     // ← disableHostCheck is now allowedHosts: "all"
  },
};