/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/16
 * Summary     :ES5 格式的export和import polyfill写法。
 *             一个shim是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现
              一个polyfill就是一个用在浏览器API上的shim.（服务端的不算polyfill）
 * *************************************************************/
(function (modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;

        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.loaded = true;

        // Return the exports of the module
        return module.exports;
    }


    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // __webpack_public_path__
    __webpack_require__.p = "/static/";

    // Load entry module and return exports
    return __webpack_require__(0);
})
/************************************************************************/
([
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {

        module.exports = __webpack_require__(1);


        /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        var _test = __webpack_require__(2);

        var _test2 = _interopRequireDefault(_test);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        (0, _test2.default)();
        /* **************************************************************
         * this file is part of My Project
         * Copyright @bulusli.
         *
         * Author      : LiHaiLong
         * Mail        : Weztt521@163.com
         * Create Date : 2016/12/15
         * Summary     : 
         *
         * *************************************************************/

        alert(JSON.stringify(_test.obj));

        /***/
    },
    /* 2 */
    /***/ function (module, exports) {

        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        exports.default = function () {
            "use strict";

            alert('wwwwwww');
        };

        ;

        var obj = {
            a: 1
        };

        exports.obj = obj;

        /***/
    }
]);