const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const baseConfig = require("./webpack.config.base");

const isDev = process.env.NODE_ENV === "development";

const defaultPluins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: isDev ? '"development"' : '"production"',
    },
  }),
  new HTMLPlugin({
    template: path.join(__dirname, "index.html"),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
];

let config;

if (isDev) {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map",
    devServer: {
      port: 3000,
      host: "localhost",
      inline: true,
      overlay: {
        errors: true,
      },
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    overrideBrowserslist: [
                      ">1%",
                      "last 4 versions",
                      "Firefox ESR",
                      "not ie < 9",
                    ],
                    flexbox: "no-2009",
                  }),
                ],
              },
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: defaultPluins.concat([new webpack.HotModuleReplacementPlugin()]),
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, "../src/index.tsx"),
    },
    output: {
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].chunk.[chunkhash:8].js",
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "./",
              },
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    overrideBrowserslist: [
                      ">1%",
                      "last 4 versions",
                      "Firefox ESR",
                      "not ie < 9",
                    ],
                    flexbox: "no-2009",
                  }),
                ],
              },
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
    plugins: defaultPluins.concat([
      new MiniCssExtractPlugin({
        filename: "static/css/styles.[chunkhash:8].css",
        chunkFilename: "static/css/styles.chunk.[chunkhash:8].css",
      }),
    ]),
  });
}

module.exports = config;
