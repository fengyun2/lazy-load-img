/*
 * @Author: baby
 * @Date:   2016-08-19 23:50:53
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2016-09-08 15:58:16
 */

// 'use strict'

// // 通过 rollup.js 编译， maths.js 中未调用的方法 square() 并未打包到新的js中。
// import { cube } from './math.js'
// console.log(cube(5)) // 125

const _lazyFlag = 'lazy-img'; // The mark of lazy load
const _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

class LazyLoadImg {
    constructor(elementId = '' ) {
        this.elementId = elementId;
        if(this.elementId && this.elementId.indexOf('#') < 0) {
            this.elementId += '#';
        }

        if(!this._images) {
            console.log('this._images');
            this._images = (this.elementId ? document.querySelector(elementId).querySelectorAll(`img[${_lazyFlag}]`) : document.querySelectorAll(`img[${_lazyFlag}]`)) || [];
        }
    }
    /**
     * 自动加载
     */
    load() {
        const images = this._images;
        console.log('images: ', images);
        if(images.length > 0) {
            for(let i = 0, len = images.length; i < len; i++) {
                const img = images[i];
                console.log('load-img: ', img);
                if(this.isOnVerticalViewPort(img) && this.isOnHorizontalViewPort(img)) {
                    console.log('load: ${i}');
                    const url = img.getAttribute(_lazyFlag);
                    img.setAttribute('src', url);
                    img.isload = true;
                }
            }
        }
    }

    init() {
        const _self = this;
        _self.load();
        window.addEventListener('scroll', () => {
            _self.load();
        }, false);
    }

    isOnVerticalViewPort(ele) {
        const rect = ele.getBoundingClientRect();
        console.log('isOnVerticalViewPort: ', rect);
        return rect.top > 0 && rect.top <= _viewPortHeight;
    }

    isOnHorizontalViewPort(ele) {
        const rect = ele.getBoundingClientRect();
        console.log('isOnHorizontalViewPort: ', rect);
        return rect.left > 0 && rect.left <= _viewPortWidth;
    }
}

export default LazyLoadImg;
