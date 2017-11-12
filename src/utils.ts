import { Scalar } from 'rgo';

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

const pad = s => (!`${s}`[1] ? `0${s}` : `${s}`);
export const getDateString = date => {
  if (!date) return '';
  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yy = `${date.getFullYear()}`.substring(2);
  return `${dd}/${mm}/${yy}`;
};

const getValueStringSub = (value: any, scalar: Scalar) => {
  if (value === undefined) return '';
  else if (value === null) return '---';
  else if (scalar === 'boolean') return value ? 'Yes' : 'No';
  else if (scalar === 'date') return getDateString(value);
  return `${value}`;
};
export const getValueString = (value: any, scalar: Scalar) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return '---';
    return value.map(v => getValueStringSub(v, scalar)).join(', ');
  }
  return getValueStringSub(value, scalar);
};
