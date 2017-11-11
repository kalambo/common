export { default as isValid } from './isValid';
export { getDateString, noUndef, transformValue } from './utils';

declare global {
  type Obj<T = any> = { [key: string]: T };
}
