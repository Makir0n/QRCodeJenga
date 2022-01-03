const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

const PORT = 9000;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  cache: false,
  devServer: {
    compress: true,
    port: PORT,
    static: {
      directory: path.join(__dirname, ""),
    },
    proxy: {
      "/dist/app.bundle.js": {
        target: `http://localhost:${PORT}/`,
        pathRewrite: { "^/dist": "" },
      },
    },
    open: true,
  },
});
