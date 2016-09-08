/*
 * @Author: baby
 * @Date:   2016-08-19 23:37:39
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2016-09-08 16:09:31
 */

'use strict';

const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

// rollup 方法返回的是 `bundle` 的 `Promise` 方法
rollup.rollup({
    entry: 'src/index.js',
    external: [''],
    plugins: [
        // riot(),
        nodeResolve({
            jsnext: true, // if provided in ES6
            main: true, // if provided in CommonJS
            browser: true // if provided for browsers
        }),
        commonjs(),
        // uglify(),
        babel()
    ]
}).then(function(bundle) {
    bundle.write({

        // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
        format: 'amd',
        moduleName: 'LazyLoadImg',
        globals: {
        },
        // sourceMap: true,
        dest: 'dist/index_amd.js'
    });
    bundle.write({
        format: 'cjs',
        moduleName: 'LazyLoadImg',
        globals: {
        },
        dest: 'dist/index_cmd.js'
    });
    bundle.write({
        format: 'es',
        moduleName: 'LazyLoadImg',
        globals: {
        },
        dest: 'dist/index_es6.js'
    });

    bundle.write({
        // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
        format: 'umd',
        moduleName: 'LazyLoadImg',
        globals: {
        },
        sourceMap: true,
        dest: 'dist/index.js'
    });
}).catch(function(err) {
    console.log(err);
});
