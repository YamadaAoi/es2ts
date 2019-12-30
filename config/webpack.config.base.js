const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "production", // development || production
  target: "web",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".mjs", ".ts", ".tsx", ".js", ".json", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.join(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "../tsconfig.json"),
            },
          },
          {
            loader: "tslint-loader",
            options: {
              configFile: path.resolve(__dirname, "../tslint.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|mp3)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "resources/[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "resources/[path][name].[ext]",
        },
      },
    ],
  },
};
