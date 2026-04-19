const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "../.env.production"),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
          priority: 10,
          chunks: "initial",
          enforce: true,
        },
        elementUI: {
          name: "element-ui",
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          priority: 20,
          chunks: "initial",
          enforce: true,
        },
        echarts: {
          name: "echarts",
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          priority: 20,
          chunks: "async",
          enforce: true,
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: "warning",
    maxAssetSize: 512 * 1024,
    maxEntrypointSize: 512 * 1024,
  },
});
