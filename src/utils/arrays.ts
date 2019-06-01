import { charFromCode } from './strings';

export const last = <T>(array: T[]): T => array[array.length - 1];

export const typedArrayFor = (value: string | Uint8Array): Uint8Array => {
  if (value instanceof Uint8Array) return value;
  const length = value.length;
  const typedArray = new Uint8Array(length);
  for (let idx = 0; idx < length; idx++) {
    typedArray[idx] = value.charCodeAt(idx);
  }
  return typedArray;
};

export const mergeIntoTypedArray = (...arrays: Array<string | Uint8Array>) => {
  const arrayCount = arrays.length;

  const typedArrays: Uint8Array[] = [];
  for (let idx = 0; idx < arrayCount; idx++) {
    const element = arrays[idx];
    typedArrays[idx] =
      element instanceof Uint8Array ? element : typedArrayFor(element);
  }

  let totalSize = 0;
  for (let idx = 0; idx < arrayCount; idx++) {
    totalSize += arrays[idx].length;
  }

  const merged = new Uint8Array(totalSize);
  let offset = 0;
  for (let arrIdx = 0; arrIdx < arrayCount; arrIdx++) {
    const arr = typedArrays[arrIdx];
    for (let byteIdx = 0, arrLen = arr.length; byteIdx < arrLen; byteIdx++) {
      merged[offset++] = arr[byteIdx];
    }
  }

  return merged;
};

export const mergeUint8Arrays = (arrays: Uint8Array[]): Uint8Array => {
  let totalSize = 0;
  for (let idx = 0, len = arrays.length; idx < len; idx++) {
    totalSize += arrays[idx].length;
  }

  const mergedBuffer = new Uint8Array(totalSize);
  let offset = 0;
  for (let idx = 0, len = arrays.length; idx < len; idx++) {
    const array = arrays[idx];
    mergedBuffer.set(array, offset);
    offset += array.length;
  }

  return mergedBuffer;
};

export const arrayAsString = (array: Uint8Array | number[]): string => {
  let str = '';
  for (let idx = 0, len = array.length; idx < len; idx++) {
    str += charFromCode(array[idx]);
  }
  return str;
};

export const byAscendingId = <T extends { id: any }>(a: T, b: T) => a.id - b.id;

export const sortedUniq = <T>(array: T[], indexer: (elem: T) => any): T[] => {
  const uniq: T[] = [];

  for (let idx = 0, len = array.length; idx < len; idx++) {
    const curr = array[idx];
    const prev = array[idx - 1];
    if (idx === 0 || indexer(curr) !== indexer(prev)) {
      uniq.push(curr);
    }
  }

  return uniq;
};
