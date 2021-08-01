// https://github.com/xin2015/Rat/ v1.0.0 Copyright 2021 Lhx
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function linear() {
        var x, i0, i1, dx0, dx1;

        var linear = {};

        linear.init = function (a) {
            x = a;
            return linear;
        }

        linear.train = function (xi) {
            i0 = 0;
            var iLimit = x.length - 1;
            for (var i = 1; i < iLimit; i++) {
                if (x[i] < xi) {
                    i0 = i;
                }
            }
            i1 = x.length - 1;
            for (var i = x.length - 2; i > 0; i--) {
                if (x[i] > xi) {
                    i1 = i;
                }
            }
            var x0 = x[i0], x1 = x[i1];
            dx0 = (xi - x0) / (x1 - x0);
            dx1 = (x1 - xi) / (x1 - x0);
            return linear;
        };

        // Model prediction
        linear.predict = function (t) {
            return t[i0] * dx1 + t[i1] * dx0;
        };

        return linear;
    }

    exports.linear = linear;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
