export { default as isValid } from './isValid';
export { decodeId, encodeId } from './shortIds';
export { getValueString, noUndef, transformValue } from './utils';

declare global {
  type Obj<T = any> = { [key: string]: T };
}
