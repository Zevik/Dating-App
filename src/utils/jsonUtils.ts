/**
 * Utility functions for handling JSON serialization
 */

/**
 * Normalizes BigInt values in an object for JSON serialization
 * @param obj The object to normalize
 * @returns A new object with BigInts converted to strings
 */
export const normalizeBigInts = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(normalizeBigInts);
  }

  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      result[key] = normalizeBigInts(obj[key]);
    }
    return result;
  }

  return obj;
}; 