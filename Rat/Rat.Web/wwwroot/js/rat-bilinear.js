// https://github.com/xin2015/Rat/ v1.0.0 Copyright 2021 Lhx
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function bilinear() {
        var x, y, ix0, ix1, iy0, iy1, dx0, dx1, dy0, dy1;
        var bilinear = {};

        bilinear.init = function (a, b) {
            x = a;
            y = b;
            return bilinear;
        }

        bilinear.train = function (xi, yi) {
            ix0 = 0;
            var iLimit = x.length - 1;
            for (var i = 1; i < iLimit; i++) {
                if (x[i] < xi) {
                    ix0 = i;
                }
            }
            ix1 = x.length - 1;
            for (var i = x.length - 2; i > 0; i--) {
                if (x[i] > xi) {
                    ix1 = i;
                }
            }
            iy0 = 0;
            var iLimit = y.length - 1;
            for (var i = 1; i < iLimit; i++) {
                if (y[i] < yi) {
                    iy0 = i;
                }
            }
            iy1 = y.length - 1;
            for (var i = y.length - 2; i > 0; i--) {
                if (y[i] > yi) {
                    iy1 = i;
                }
            }
            var x0 = x[ix0], x1 = x[ix1];
            var y0 = y[iy0], y1 = y[iy1];
            dx0 = (xi - x0) / (x1 - x0);
            dx1 = (x1 - xi) / (x1 - x0);
            dy0 = (yi - y0) / (y1 - y0);
            dy1 = (y1 - yi) / (y1 - y0);
            return bilinear;
        };

        // Model prediction
        bilinear.predict = function (t) {
            return t[ix0 + iy0 * x.length] * dx1 * dy1 + t[ix1 + iy0 * x.length] * dx0 * dy1 + t[ix0 + iy1 * x.length] * dx1 * dy0 + t[ix1 + iy1 * x.length] * dx0 * dy0;
        };

        return bilinear;
    }

    exports.bilinear = bilinear;

    Object.defineProperty(exports, '__esModule', { value: true });
})));
