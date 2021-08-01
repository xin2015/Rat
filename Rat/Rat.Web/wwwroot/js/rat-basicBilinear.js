// https://github.com/xin2015/Rat/ v1.0.0 Copyright 2021 Lhx
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function basicBilinear() {
        var x0, x1, y0, y1, dx0, dx1, dy0, dy1;
        var basicBilinear = {};

        basicBilinear.init = function (a, b, c, d) {
            x0 = a;
            x1 = b;
            y0 = c;
            y1 = d;
            return basicBilinear;
        }

        basicBilinear.train = function (xi, yi) {
            dx0 = (xi - x0) / (x1 - x0);
            dx1 = (x1 - xi) / (x1 - x0);
            dy0 = (yi - y0) / (y1 - y0);
            dy1 = (y1 - yi) / (y1 - y0);
            return basicBilinear;
        };

        // Model prediction
        basicBilinear.predict = function (t00, t10, t01, t11) {
            return t00 * dx1 * dy1 + t10 * dx0 * dy1 + t01 * dx1 * dy0 + t11 * dx0 * dy0;
        };

        return basicBilinear;
    }

    exports.basicBilinear = basicBilinear;

    Object.defineProperty(exports, '__esModule', { value: true });
})));
