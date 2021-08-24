const uploadMapFilePlugin = require("upload-source-map-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new uploadMapFilePlugin({
        uploadUrl: "http://localhost:7001/api/upload",
        params: {
          a: "5",
          b: "6",
        },
      }),
    ],
  },
};
