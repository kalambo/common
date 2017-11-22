"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseX = require("base-x");
var base16 = baseX('0123456789abcdef');
var base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
exports.encodeId = function (id) {
    return base62.encode(base16.decode(id.replace(/-/g, '')));
};
exports.decodeId = function (id) {
    return base16
        .encode(base62.decode(id))
        .split('')
        .map(function (c, i) { return ([8, 12, 16, 20].includes(i) ? "-" + c : c); })
        .join('');
};
