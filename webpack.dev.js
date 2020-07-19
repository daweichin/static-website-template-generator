const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require("./webpack.config");
const { merge } = require("webpack-merge");

let pages = ["index", "about", "404"];

let pagesConfig = pages.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + ".html",
    template: __dirname + `/src/${entryName}.html`,
  });
});

module.exports = merge(config, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [].concat(pagesConfig),
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extracts css into files
            loader: "style-loader",
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("autoprefixer")];
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
});
