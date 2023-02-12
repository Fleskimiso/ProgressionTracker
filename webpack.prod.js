const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/frontEnd/index.tsx",
    output: {
      path: path.resolve(__dirname, "src/backEnd/frontDist"),
      filename: "bundle.js",
      publicPath: "/static"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/frontEnd/index.html",
      })
    ],
    mode: "production",
  };