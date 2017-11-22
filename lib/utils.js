"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.noUndef = function (v) { return (v === undefined ? null : v); };
exports.transformValue = function (value, transform) {
    if (!transform || typeof value !== 'string') {
        return value;
    }
    else if (transform === 'email') {
        return value.toLowerCase().replace(/\s/g, '');
    }
    else if (transform === 'url') {
        return value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }
    return value;
};
var getValueStringSub = function (value, scalar) {
    if (value === undefined)
        return '';
    else if (value === null)
        return '---';
    else if (scalar === 'boolean')
        return value ? 'Yes' : 'No';
    else if (scalar === 'date')
        return moment(value).format('DD/MM/YY');
    return "" + value;
};
exports.getValueString = function (value, scalar) {
    if (Array.isArray(value)) {
        if (value.length === 0)
            return '---';
        return value.map(function (v) { return getValueStringSub(v, scalar); }).join(', ');
    }
    return getValueStringSub(value, scalar);
};
