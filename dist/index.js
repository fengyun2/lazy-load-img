(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.LazyLoadImg = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

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

var _lazyFlag = 'lazy-img'; // The mark of lazy load
var _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

var LazyLoadImg = function () {
    function LazyLoadImg() {
        var elementId = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        classCallCheck(this, LazyLoadImg);

        this.elementId = elementId;
        if (this.elementId && this.elementId.indexOf('#') < 0) {
            this.elementId += '#';
        }

        if (!this._images) {
            console.log('this._images');
            this._images = (this.elementId ? document.querySelector(elementId).querySelectorAll('img[' + _lazyFlag + ']') : document.querySelectorAll('img[' + _lazyFlag + ']')) || [];
        }
    }
    /**
     * 自动加载
     */


    createClass(LazyLoadImg, [{
        key: 'load',
        value: function load() {
            var images = this._images;
            console.log('images: ', images);
            if (images.length > 0) {
                for (var i = 0, len = images.length; i < len; i++) {
                    var img = images[i];
                    console.log('load-img: ', img);
                    if (this.isOnVerticalViewPort(img) && this.isOnHorizontalViewPort(img)) {
                        console.log('load: ${i}');
                        var url = img.getAttribute(_lazyFlag);
                        img.setAttribute('src', url);
                        img.isload = true;
                    }
                }
            }
        }
    }, {
        key: 'init',
        value: function init() {
            var _self = this;
            _self.load();
            window.addEventListener('scroll', function () {
                _self.load();
            }, false);
        }
    }, {
        key: 'isOnVerticalViewPort',
        value: function isOnVerticalViewPort(ele) {
            var rect = ele.getBoundingClientRect();
            console.log('isOnVerticalViewPort: ', rect);
            return rect.top > 0 && rect.top <= _viewPortHeight;
        }
    }, {
        key: 'isOnHorizontalViewPort',
        value: function isOnHorizontalViewPort(ele) {
            var rect = ele.getBoundingClientRect();
            console.log('isOnHorizontalViewPort: ', rect);
            return rect.left > 0 && rect.left <= _viewPortWidth;
        }
    }]);
    return LazyLoadImg;
}();

return LazyLoadImg;

})));
//# sourceMappingURL=index.js.map
