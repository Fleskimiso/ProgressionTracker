const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./src/frontEnd/index.tsx",
  output: {
    path: path.resolve(__dirname, "src/frontEnd/dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'src/frontEnd/dist')
    },
    compress: true,
    port: 9000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000" 
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/frontEnd/index.html"
    })
  ],
  mode: "development",
};
