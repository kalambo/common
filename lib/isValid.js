"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var formats = {
    email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
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
        if (utils_1.transformValue(value, rules.transform) !== value)
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
    if (rules.options) {
        if (Array.isArray(rules.options)) {
            if (!rules.options.includes(value))
                return false;
        }
        else {
            if (!Object.keys(rules.options).some(function (k) { return rules.options[k] === value; })) {
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
