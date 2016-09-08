/*
 * @Author: fengyun2
 * @Date:   2016-08-20 09:28:36
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2016-09-08 15:08:13
 */

'use strict';

var gulp = require('gulp');
var fs = require('fs');
var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');
// var npm = require('rollup-plugin-npm');
var commonjs = require('rollup-plugin-commonjs');
// var nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('script', function() {
    return rollup({
        entry: 'src/index.js',
        plugins: [
            // nodeResolve({ jsnext: true }),
            // commonjs()

            // npm({ jsnext: true, main: true }),
            commonjs(),
            // uglify(),
            babel()
        ]
    }).then(function(bundle) {
        // 输出 bundle + sourcemap
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            // amd – 使用像requirejs一样的银木块定义
            // cjs – CommonJS，适用于node和browserify / Webpack
            // es6 (default) – 保持ES6的格式
            // iife – 使用于<script> 标签引用的方式
            // umd – 适用于CommonJs和AMD风格通用模式
            format: 'cjs'
        });

        fs.writeFileSync('dist/bundle.js', result.code);

        bundle.write({
            format: 'cjs',
            dest: 'dist/index.js'
        });
    });
});

gulp.task('default', ['script']);
