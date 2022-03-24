const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    devtool: env.production ? "source-map" : "eval-cheap-module-source-map",
    entry: path.resolve(__dirname, "./main.js"),
    output: {
      filename: "b-engine-common.bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
    externals: {
      jquery: "jQuery",
      angular: "anular",
      lodash: "lodash",
    },
  };
};
