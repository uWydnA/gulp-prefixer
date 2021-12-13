const { src, dest, parallel } = require("gulp");
const gulpPrefixer = require("./plugins/index.js");

function copyLess(toDir) {
  return function copyAssets() {
    return src("src/**/*.less")
      .pipe(
        gulpPrefixer({
          prefix: "priviteKey", //前缀字符串
          prefixInCss: "#", // 选择器前缀，#或者.
        })
      )
      .pipe(dest(toDir));
  };
}

exports.default = parallel(copyLess("lib"), copyLess("es"));
