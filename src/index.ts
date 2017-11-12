export { default as isValid } from './isValid';
export { decodeId, encodeId } from './shortIds';
export {
  getDateString,
  getValueString,
  noUndef,
  transformValue,
} from './utils';

declare global {
  type Obj<T = any> = { [key: string]: T };
}
