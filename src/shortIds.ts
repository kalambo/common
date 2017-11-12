import * as baseX from 'base-x';

const base16 = baseX('0123456789abcdef');
const base62 = baseX(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
);

export const encodeId = (id: string) =>
  base62.encode(base16.decode(id.replace(/-/g, '')));

export const decodeId = (id: string) =>
  base16
    .encode(base62.decode(id))
    .split('')
    .map((c, i) => ([8, 12, 16, 20].includes(i) ? `-${c}` : c))
    .join('');
