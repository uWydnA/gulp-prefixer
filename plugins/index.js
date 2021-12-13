const through = require("through2");

const PLUGIN_NAME = "gulp-prefixer";

function gulpPrefixer({ prefix, prefixInCss }) {
  if (!prefix) {
    throw new Error(PLUGIN_NAME, "Missing prefix text!");
  }

  prefix = new Buffer(`${prefixInCss}${prefix} {`);
  const prefixTextEnd = new Buffer("}");

  const stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit("error", new Error(PLUGIN_NAME, "Streams are not supported!"));
      return cb();
    }

    const fileContents = file.contents.toString();
    const isHasImport = fileContents.includes("@import");

    if (file.isBuffer() && !isHasImport) {
      file.contents = Buffer.concat([prefix, file.contents]);
      file.contents = Buffer.concat([file.contents, prefixTextEnd]);
    }

    this.push(file);

    cb();
  });

  return stream;
}

module.exports = gulpPrefixer;
