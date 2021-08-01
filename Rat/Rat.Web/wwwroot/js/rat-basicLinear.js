// https://github.com/xin2015/Rat/ v1.0.0 Copyright 2021 Lhx
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function basicLinear() {
        var x0, x1, dx0, dx1;
        var basicLinear = {};

        basicLinear.init = function (a, b) {
            x0 = a;
            x1 = b;
            return basicLinear;
        }

        basicLinear.train = function (xi) {
            dx0 = (xi - x0) / (x1 - x0);
            dx1 = (x1 - xi) / (x1 - x0);
            return basicLinear;
        };

        // Model prediction
        basicLinear.predict = function (t0, t1) {
            return t0 * dx1 + t1 * dx0;
        };

        return basicLinear;
    }

    exports.basicLinear = basicLinear;

    Object.defineProperty(exports, '__esModule', { value: true });
})));
