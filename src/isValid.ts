import { Scalar } from 'rgo';

import { transformValue } from './utils';

export interface Rules {
  equals?: any;
  email?: true;
  password?: true;
  transform?: 'email' | 'url';
  maxWords?: number;
  minChoices?: number;
  maxChoices?: number;
  lt?: string;
  gt?: string;
  options?: any[] | Obj;
}

const formats = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
};

const isValidSingle = (
  rules: { scalar: Scalar; optional?: boolean } & Rules,
  value: any,
  values: Obj,
) => {
  if (value === null) return !!rules.optional;

  if (rules.equals !== undefined && !Array.isArray(rules.equals)) {
    if (value !== rules.equals) return false;
  }

  if (rules.email) {
    if (typeof value !== 'string' || !formats.email.test(value)) return false;
  }

  if (rules.password) {
    if (typeof value !== 'string' || value.length < 10 || value.length > 64) {
      return false;
    }
  }

  if (rules.transform) {
    if (transformValue(value, rules.transform) !== value) return false;
  }

  if (rules.maxWords) {
    if (
      typeof value !== 'string' ||
      (value.match(/\S+/gi) || []).length > rules.maxWords
    ) {
      return false;
    }
  }

  if (rules.lt) {
    const otherValue = values[rules.lt];
    if (otherValue !== null && value >= otherValue) return false;
  }

  if (rules.gt) {
    const otherValue = values[rules.gt];
    if (otherValue !== null && value <= otherValue) return false;
  }

  if (rules.options) {
    if (Array.isArray(rules.options)) {
      if (!rules.options.includes(value)) return false;
    } else {
      if (!Object.keys(rules.options).some(k => rules.options![k] === value)) {
        return false;
      }
    }
  }

  return true;
};

export default function isValid(
  rules: { scalar: Scalar; optional?: boolean } & Rules,
  value: any,
  values: Obj,
) {
  if (value === null || (Array.isArray(value) && value.length === 0)) {
    return !!rules.optional;
  }

  if (rules.equals !== undefined && Array.isArray(rules.equals)) {
    if (!Array.isArray(value) || value.length !== rules.equals.length) {
      return false;
    }
    if (rules.equals.some((v, i) => value[i] !== v)) return false;
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
    ? value.every(v => isValidSingle(rules, v, values))
    : isValidSingle(rules, value, values);
}
