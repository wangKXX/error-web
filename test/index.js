/* eslint-disable prettier/prettier */
class TestPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.zipDone.tap("upload-sourcemap-plugin",  url => {
      console.log(url, "78");
    });
  }
}

module.exports = TestPlugin;
