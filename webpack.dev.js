const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "js/[name].js",
    chunkFilename: "[id].js",
    publicPath: "/",
    assetModuleFilename: "assets/[name][ext]",
  },

  devServer: {
    port: 3000,
    contentBase: path.join(process.cwd(), "./dist"),
    watchContentBase: true,
    quiet: false,
    open: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: "404.html",
        },
      ],
    },
    publicPath: "./dist",
    writeToDisk: true,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist/**/*.js", "dist/**/*.css", "site/content/webpack.json"],
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
});
