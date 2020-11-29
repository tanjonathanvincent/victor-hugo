const AssetsPlugin = require("assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: path.join(process.cwd(), "src/index.js"),
  },

  experiments: {
    asset: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|eot|woff|woff2|ttf|svg|gif))$/,
        type: "asset/resource",
      },

      {
        test: /\.json$/,
        loader: "json-loader",
      },

      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true,
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/fonts/",
        to: "fonts/",
        flatten: true,
      },
    ]),
  ],
};
