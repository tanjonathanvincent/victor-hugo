const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",

  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "js/[name].[contenthash:6].js",
    chunkFilename: "[id].[contenthash:6].js",
    publicPath: "/",
    assetModuleFilename: "assets/[name][ext]",
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "[name].[contenthash:6].css",
    }),
  ],
});
