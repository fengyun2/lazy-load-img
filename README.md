# LazyLoadImg

> 图片懒加载插件

## Start

### Install

```bash
npm install
```


### Run

```bash
node rollup.config.js
```

## Plugin

* `rollup-plugin-babel`: outputs ES5
* ~~`rollup-plugin-npm`: loads modules in node_modules~~
* `rollup-plugin-commonjs`: converts CommonJS to ES6

## Bug

* LazyLoadImg 的 img 必须设置宽高,要不不生效(单位不能为百分比)

``` css
    img {
        height: 900px;
        width: 1200px;
        /*width: 100px;
        height: 100px;*/
    }
```

* `Rollup.js` 中可以 `catch` 下 `error` 方便调试错误
* `UMD/IIFE` 模式中需要 `moduleName`
* `Rollup` 的模块引用只支持 `ES6 Module`，其他的需要采用 `npm` 和 `commonjs` 的插件去解决
* `rollup-plugin-npm` 被废弃了, 改为 `rollup-plugin-node-resolve`
