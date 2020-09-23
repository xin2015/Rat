// https://github.com/xin2015/Rat/kriging/ v1.0.0 Copyright 2020 xin2015
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.rat = global.rat || {}));
}(this, (function (exports) {
    'use strict';

    function rep(c, n) {
        var t = Array(n);
        var i;
        for (i = 0; i < n; i++) t[i] = c;
        return t;
    }

    function diag(c, n) {
        var i, Z = rep(0, n * n);
        for (i = 0; i < n; i++) Z[i * n + i] = c;
        return Z;
    }

    function transpose(X, n, m) {
        var i, j, Z = Array(m * n);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[j * n + i] = X[i * m + j];
        return Z;
    }

    function add(X, Y, n, m) {
        var i, j, Z = Array(n * m);
        for (i = 0; i < n; i++)
            for (j = 0; j < m; j++)
                Z[i * m + j] = X[i * m + j] + Y[i * m + j];
        return Z;
    }

    // Naive matrix multiplication
    function multiply(X, Y, n, m, p) {
        var i, j, k, Z = Array(n * p);
        for (i = 0; i < n; i++) {
            for (j = 0; j < p; j++) {
                Z[i * p + j] = 0;
                for (k = 0; k < m; k++)
                    Z[i * p + j] += X[i * m + k] * Y[k * p + j];
            }
        }
        return Z;
    }

    // Cholesky decomposition
    function chol(X, n) {
        var i, j, k, sum, p = Array(n);
        for (i = 0; i < n; i++) p[i] = X[i * n + i];
        for (i = 0; i < n; i++) {
            for (j = 0; j < i; j++)
                p[i] -= X[i * n + j] * X[i * n + j];
            if (p[i] <= 0) return false;
            p[i] = Math.sqrt(p[i]);
            for (j = i + 1; j < n; j++) {
                for (k = 0; k < i; k++)
                    X[j * n + i] -= X[j * n + k] * X[i * n + k];
                X[j * n + i] /= p[i];
            }
        }
        for (i = 0; i < n; i++) X[i * n + i] = p[i];
        return true;
    }

    // Inversion of cholesky decomposition
    function chol2inv(X, n) {
        var i, j, k, sum;
        for (i = 0; i < n; i++) {
            X[i * n + i] = 1 / X[i * n + i];
            for (j = i + 1; j < n; j++) {
                sum = 0;
                for (k = i; k < j; k++)
                    sum -= X[j * n + k] * X[k * n + i];
                X[j * n + i] = sum / X[j * n + j];
            }
        }
        for (i = 0; i < n; i++)
            for (j = i + 1; j < n; j++)
                X[i * n + j] = 0;
        for (i = 0; i < n; i++) {
            X[i * n + i] *= X[i * n + i];
            for (k = i + 1; k < n; k++)
                X[i * n + i] += X[k * n + i] * X[k * n + i];
            for (j = i + 1; j < n; j++)
                for (k = j; k < n; k++)
                    X[i * n + j] += X[k * n + i] * X[k * n + j];
        }
        for (i = 0; i < n; i++)
            for (j = 0; j < i; j++)
                X[i * n + j] = X[j * n + i];
    }

    // Inversion via gauss-jordan elimination
    function solve(X, n) {
        var m = n;
        var b = Array(n * n);
        var indxc = Array(n);
        var indxr = Array(n);
        var ipiv = Array(n);
        var i, icol, irow, j, k, l, ll;
        var big, dum, pivinv, temp;

        for (i = 0; i < n; i++)
            for (j = 0; j < n; j++) {
                if (i == j) b[i * n + j] = 1;
                else b[i * n + j] = 0;
            }
        for (j = 0; j < n; j++) ipiv[j] = 0;
        for (i = 0; i < n; i++) {
            big = 0;
            for (j = 0; j < n; j++) {
                if (ipiv[j] != 1) {
                    for (k = 0; k < n; k++) {
                        if (ipiv[k] == 0) {
                            if (Math.abs(X[j * n + k]) >= big) {
                                big = Math.abs(X[j * n + k]);
                                irow = j;
                                icol = k;
                            }
                        }
                    }
                }
            }
            ++(ipiv[icol]);

            if (irow != icol) {
                for (l = 0; l < n; l++) {
                    temp = X[irow * n + l];
                    X[irow * n + l] = X[icol * n + l];
                    X[icol * n + l] = temp;
                }
                for (l = 0; l < m; l++) {
                    temp = b[irow * n + l];
                    b[irow * n + l] = b[icol * n + l];
                    b[icol * n + l] = temp;
                }
            }
            indxr[i] = irow;
            indxc[i] = icol;

            if (X[icol * n + icol] == 0) return false; // Singular

            pivinv = 1 / X[icol * n + icol];
            X[icol * n + icol] = 1;
            for (l = 0; l < n; l++) X[icol * n + l] *= pivinv;
            for (l = 0; l < m; l++) b[icol * n + l] *= pivinv;

            for (ll = 0; ll < n; ll++) {
                if (ll != icol) {
                    dum = X[ll * n + icol];
                    X[ll * n + icol] = 0;
                    for (l = 0; l < n; l++) X[ll * n + l] -= X[icol * n + l] * dum;
                    for (l = 0; l < m; l++) b[ll * n + l] -= b[icol * n + l] * dum;
                }
            }
        }
        for (l = (n - 1); l >= 0; l--)
            if (indxr[l] != indxc[l]) {
                for (k = 0; k < n; k++) {
                    temp = X[k * n + indxr[l]];
                    X[k * n + indxr[l]] = X[k * n + indxc[l]];
                    X[k * n + indxc[l]] = temp;
                }
            }

        return true;
    }


    function kriging() {
        var model = 'exponential';
        var modelFunc = exponential;
        var sigma2 = 0, alpha = 100;
        var data = {};
        var nugget = 0.0, range = 0.0, sill = 0.0, A = 1 / 3;
        var n;
        var K, M;

        var kriging = {};

        function gaussian(h) {
            return nugget + ((sill - nugget) / range) *
                (1.0 - Math.exp(-(1.0 / A) * Math.pow(h / range, 2)));
        }

        function exponential(h) {
            return nugget + ((sill - nugget) / range) *
                (1.0 - Math.exp(-(1.0 / A) * (h / range)));
        }

        function spherical(h) {
            if (h > range) return nugget + (sill - nugget) / range;
            return nugget + ((sill - nugget) / range) *
                (1.5 * (h / range) - 0.5 * Math.pow(h / range, 3));
        }

        kriging.model = function (_) {
            if (arguments.length) {
                switch (_) {
                    case 'gaussian': {
                        model = 'gaussian';
                        modelFunc = gaussian;
                        break;
                    }
                    case 'exponential': {
                        model = 'exponential';
                        modelFunc = exponential;
                        break;
                    }
                    case 'spherical': {
                        model = 'spherical';
                        modelFunc = spherical;
                        break;
                    }
                }
                return kriging;
            } else {
                return model;
            }
        };

        kriging.sigma2 = function (_) {
            return arguments.length ? (sigma2 = _, kriging) : sigma2;
        };

        kriging.alpha = function (_) {
            return arguments.length ? (alpha = _, kriging) : alpha;
        };

        kriging.train = function (t, x, y) {
            data.t = t;
            data.x = x;
            data.y = y;
            n = t.length;
            // Lag distance/semivariance
            var i, j, k, l;
            var distance = Array((n * n - n) / 2);
            for (i = 0, k = 0; i < n; i++)
                for (j = 0; j < i; j++, k++) {
                    distance[k] = Array(2);
                    distance[k][0] = Math.pow(
                        Math.pow(x[i] - x[j], 2) +
                        Math.pow(y[i] - y[j], 2), 0.5);
                    distance[k][1] = Math.abs(t[i] - t[j]);
                }
            distance.sort(function (a, b) { return a[0] - b[0]; });
            range = distance[(n * n - n) / 2 - 1][0];

            // Bin lag distance
            var lags = ((n * n - n) / 2) > 30 ? 30 : (n * n - n) / 2;
            var tolerance = range / lags;
            var lag = rep(0, lags);
            var semi = rep(0, lags);
            if (lags < 30) {
                for (l = 0; l < lags; l++) {
                    lag[l] = distance[l][0];
                    semi[l] = distance[l][1];
                }
            }
            else {
                for (i = 0, j = 0, k = 0, l = 0; i < lags && j < ((n * n - n) / 2); i++, k = 0) {
                    while (distance[j][0] <= ((i + 1) * tolerance)) {
                        lag[l] += distance[j][0];
                        semi[l] += distance[j][1];
                        j++; k++;
                        if (j >= ((n * n - n) / 2)) break;
                    }
                    if (k > 0) {
                        lag[l] /= k;
                        semi[l] /= k;
                        l++;
                    }
                }
                if (l < 2) return kriging; // Error: Not enough points
            }

            // Feature transformation
            n = l;
            range = lag[n - 1] - lag[0];
            var X = rep(1, 2 * n);
            var Y = Array(n);
            for (i = 0; i < n; i++) {
                switch (model) {
                    case "gaussian":
                        X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * Math.pow(lag[i] / range, 2));
                        break;
                    case "exponential":
                        X[i * 2 + 1] = 1.0 - Math.exp(-(1.0 / A) * lag[i] / range);
                        break;
                    case "spherical":
                        X[i * 2 + 1] = 1.5 * (lag[i] / range) - 0.5 * Math.pow(lag[i] / range, 3);
                        break;
                };
                Y[i] = semi[i];
            }

            // Least squares
            var Xt = transpose(X, n, 2);
            var Z = multiply(Xt, X, 2, n, 2);
            Z = add(Z, diag(1 / alpha, 2), 2, 2);
            var cloneZ = Z.slice(0);
            if (chol(Z, 2))
                chol2inv(Z, 2);
            else {
                solve(cloneZ, 2);
                Z = cloneZ;
            }
            var W = multiply(multiply(Z, Xt, 2, 2, n), Y, 2, n, 1);

            // Variogram parameters
            nugget = W[0];
            sill = W[1] * range + nugget;
            n = x.length;

            // Gram matrix with prior
            K = Array(n * n);
            for (i = 0; i < n; i++) {
                for (j = 0; j < i; j++) {
                    K[i * n + j] = modelFunc(Math.pow(Math.pow(x[i] - x[j], 2) + Math.pow(y[i] - y[j], 2), 0.5));
                    K[j * n + i] = K[i * n + j];
                }
                K[i * n + i] = modelFunc(0);
            }

            // Inverse penalized Gram matrix projected to target vector
            var C = add(K, diag(sigma2, n), n, n);
            var cloneC = C.slice(0);
            if (chol(C, n))
                chol2inv(C, n);
            else {
                solve(cloneC, n);
                C = cloneC;
            }

            // Copy unprojected inverted matrix as K
            K = C.slice(0);
            M = multiply(C, t, n, n, 1);

            return kriging;
        };

        // Model prediction
        kriging.predict = function (x, y) {
            var i, k = Array(n);
            for (i = 0; i < n; i++)
                k[i] = modelFunc(Math.pow(Math.pow(x - data.x[i], 2) + Math.pow(y - data.y[i], 2), 0.5));
            return multiply(k, M, 1, n, 1)[0];
        };

        kriging.variance = function (x, y) {
            var i, k = Array(n);
            for (i = 0; i < n; i++)
                k[i] = modelFunc(Math.pow(Math.pow(x - data.x[i], 2) + Math.pow(y - data.y[i], 2), 0.5));
            return modelFunc(0) + multiply(multiply(k, K, 1, n, n), k, 1, n, 1)[0];
        };

        return kriging;
    }

    exports.kriging = kriging;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
