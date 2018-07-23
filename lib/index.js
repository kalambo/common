"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isValid_1 = require("./isValid");
exports.isValid = isValid_1.default;
var shortIds_1 = require("./shortIds");
exports.decodeId = shortIds_1.decodeId;
exports.encodeId = shortIds_1.encodeId;
var utils_1 = require("./utils");
exports.getValueString = utils_1.getValueString;
exports.noUndef = utils_1.noUndef;
exports.transformValue = utils_1.transformValue;
exports.root = typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
