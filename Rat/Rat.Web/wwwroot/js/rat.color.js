// https://github.com/xin2015/Rat/ v1.0.0 Copyright 2020 Lhx
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function color() {
        var colorMode = 'gradient';
        var levelColors = [{
            r: 0,
            g: 228,
            b: 0
        }, {
            r: 255,
            g: 255,
            b: 0
        }, {
            r: 255,
            g: 126,
            b: 0
        }, {
            r: 255,
            g: 0,
            b: 0
        }, {
            r: 153,
            g: 0,
            b: 76
        }, {
            r: 126,
            g: 0,
            b: 35
        }];
        var gradientColors = [{
            r: 128,
            g: 214,
            b: 0
        }, {
            r: 0,
            g: 228,
            b: 0
        }, {
            r: 255,
            g: 255,
            b: 0
        }, {
            r: 255,
            g: 126,
            b: 0
        }, {
            r: 255,
            g: 0,
            b: 0
        }, {
            r: 153,
            g: 0,
            b: 76
        }, {
            r: 126,
            g: 0,
            b: 35
        }, {
            r: 108,
            g: 0,
            b: 8
        }];
        var levels = [0, 50, 100, 150, 200, 300, 500];
        var gradients = [0, 25, 75, 125, 175, 250, 400, 500];
        var limitMode = [true, true];
        var valueMode = 'less';


        var color = function (value) {
            if (colorMode == 'gradient') {
                var min = gradients[0], max = gradients[gradients.length - 1];
                var validate = (limitMode[0] ? value >= min : value > min) && (limitMode[1] ? value <= max : value < max);
                if (validate) {
                    var r, g, b;
                    if (valueMode == 'less') {
                        for (var i = 1, j = 0; i < gradients.length; j = i++) {
                            if (value <= gradients[i]) {
                                var p = (value - gradients[j]) / (gradients[i] - gradients[j]);
                                r = gradientColors[j].r + Math.round(p * (gradientColors[i].r - gradientColors[j].r));
                                g = gradientColors[j].g + Math.round(p * (gradientColors[i].g - gradientColors[j].g));
                                b = gradientColors[j].b + Math.round(p * (gradientColors[i].b - gradientColors[j].b));
                                break;
                            }
                        }
                    } else {
                        for (var i = gradients.length - 2, j = gradients.length - 1; i >= 0; j = i--) {
                            if (value >= gradients[i]) {
                                var p = (value - gradients[j]) / (gradients[i] - gradients[j]);
                                r = gradientColors[j].r + Math.round(p * (gradientColors[i].r - gradientColors[j].r));
                                g = gradientColors[j].g + Math.round(p * (gradientColors[i].g - gradientColors[j].g));
                                b = gradientColors[j].b + Math.round(p * (gradientColors[i].b - gradientColors[j].b));
                                break;
                            }
                        }
                    }
                    return 'rgb(' + r + ',' + g + ',' + b + ')';
                } else {
                    return undefined;
                }
            } else {
                var min = levels[0], max = levels[levels.length - 1];
                var validate = (limitMode[0] ? value >= min : value > min) && (limitMode[1] ? value <= max : value < max);
                if (validate) {
                    var r, g, b;
                    if (valueMode == 'less') {
                        for (var i = 1; i < levels.length; i++) {
                            if (value <= levels[i]) {
                                r = colors[i].r;
                                g = colors[i].g;
                                b = colors[i].b;
                                break;
                            }
                        }
                    } else {
                        for (var i = levels.length - 2; i >= 0; i--) {
                            if (value >= levels[i]) {
                                r = colors[i].r;
                                g = colors[i].g;
                                b = colors[i].b;
                                break;
                            }
                        }
                    }
                    return 'rgb(' + r + ',' + g + ',' + b + ')';
                } else {
                    return undefined;
                }
            }
        }

        color.colorMode = function (_) {
            return arguments.length ? (colorMode = _, color) : colorMode;
        };

        color.levelColors = function (_) {
            return arguments.length ? (levelColors = _, color) : levelColors;
        }

        color.gradientColors = function (_) {
            return arguments.length ? (gradientColors = _, color) : gradientColors;
        };

        color.levels = function (_) {
            return arguments.length ? (levels = _, color) : levels;
        };

        color.gradients = function (_) {
            return arguments.length ? (gradients = _, color) : gradients;
        };

        color.limitMode = function (_) {
            return arguments.length ? (limitMode = _, color) : limitMode;
        };

        color.valueMode = function (_) {
            return arguments.length ? (valueMode = _, color) : valueMode;
        };

        return color;
    }

    exports.color = color;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
