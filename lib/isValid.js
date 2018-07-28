"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var formats = {
    email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
};
var isEqual = function (scalar, v1, v2) {
    if (scalar === 'date')
        return (v1 && v1.getTime()) === (v2 && v2.getTime());
    return v1 === v2;
};
var isValidSingle = function (rules, value, values) {
    if (value === null)
        return !!rules.optional;
    if (rules.equals !== undefined && !Array.isArray(rules.equals)) {
        if (value !== rules.equals)
            return false;
    }
    if (rules.email) {
        if (typeof value !== 'string' || !formats.email.test(value))
            return false;
    }
    if (rules.password) {
        if (typeof value !== 'string' || value.length < 10 || value.length > 64) {
            return false;
        }
    }
    if (rules.transform) {
        if (exports.transformValue(value, rules.transform) !== value)
            return false;
    }
    if (rules.maxWords) {
        if (typeof value !== 'string' ||
            (value.match(/\S+/gi) || []).length > rules.maxWords) {
            return false;
        }
    }
    if (rules.lt) {
        var otherValue = values[rules.lt];
        if (otherValue !== null && value >= otherValue)
            return false;
    }
    if (rules.gt) {
        var otherValue = values[rules.gt];
        if (otherValue !== null && value <= otherValue)
            return false;
    }
    if (rules.options && !rules.other) {
        if (Array.isArray(rules.options)) {
            if (!rules.options.some(function (v) { return isEqual(rules.scalar, v, value); })) {
                return false;
            }
        }
        else {
            if (!Object.keys(rules.options).some(function (k) {
                return isEqual(rules.scalar, rules.options[k], value);
            })) {
                return false;
            }
        }
    }
    return true;
};
function isValid(rules, value, values) {
    if (value === null || (Array.isArray(value) && value.length === 0)) {
        return !!rules.optional;
    }
    if (rules.equals !== undefined && Array.isArray(rules.equals)) {
        if (!Array.isArray(value) || value.length !== rules.equals.length) {
            return false;
        }
        if (rules.equals.some(function (v, i) { return value[i] !== v; }))
            return false;
    }
    if (rules.minChoices) {
        if (!Array.isArray(value) || value.length < rules.minChoices) {
            return false;
        }
    }
    if (rules.maxChoices) {
        if (!Array.isArray(value) || value.length > rules.maxChoices) {
            return false;
        }
    }
    return Array.isArray(value)
        ? value.every(function (v) { return isValidSingle(rules, v, values); })
        : isValidSingle(rules, value, values);
}
exports.default = isValid;
