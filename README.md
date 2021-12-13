## gulp-prefixer

### 使用方法

```js
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
```

### 产物对比

- 源码

```less
//index.less
@import "./custom.less";

//custom.less
.box {
  color: red;
}
.content {
  font-size: 12px;
}
```

- 打包后产物

```less
//index.less
@import "./custom.less";

//custom.less
#priviteKey {
  .box {
    color: red;
  }
  .content {
    font-size: 12px;
  }
}
```
