import { Rgo } from 'rgo';

export { default as isValid } from './isValid';
export { decodeId, encodeId } from './shortIds';
export { Obj } from './typings';
export { getValueString, noUndef, transformValue } from './utils';

export const root =
  typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : ({} as Window | Global);

declare global {
  interface Window {
    rgo: Rgo;
  }
  interface Global {
    rgo: Rgo;
  }
}
declare global {
  namespace NodeJS {
    interface Global {
      rgo: Rgo;
    }
  }
}
