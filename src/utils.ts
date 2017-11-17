import { Scalar } from 'rgo';
import * as moment from 'moment';

export const noUndef = (v: any) => (v === undefined ? null : v);

export const transformValue = (value: any, transform?: 'email' | 'url') => {
  if (!transform || typeof value !== 'string') {
    return value;
  } else if (transform === 'email') {
    return value.toLowerCase().replace(/\s/g, '');
  } else if (transform === 'url') {
    return value.toLowerCase().replace(/[^a-z0-9-]/g, '');
  }
  return value;
};

const getValueStringSub = (value: any, scalar: Scalar) => {
  if (value === undefined) return '';
  else if (value === null) return '---';
  else if (scalar === 'boolean') return value ? 'Yes' : 'No';
  else if (scalar === 'date') return moment(value).format('DD/MM/YY');
  return `${value}`;
};
export const getValueString = (value: any, scalar: Scalar) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return '---';
    return value.map(v => getValueStringSub(v, scalar)).join(', ');
  }
  return getValueStringSub(value, scalar);
};
