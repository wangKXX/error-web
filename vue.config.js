const zipDirectoryPlugin = require("./plugin");
const testPlugin = require("./test");

module.exports = {
  configureWebpack: {
    plugins: [new zipDirectoryPlugin(), new testPlugin()],
  },
};
