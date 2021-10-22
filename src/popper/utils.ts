import { Ref } from "./RefTypes";

/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
export const unwrapArray = (arg: any): any =>
  Array.isArray(arg) ? arg[0] : arg;

/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */
export const safeInvoke = (fn: (...e: any[]) => void, ...args: any[]): any => {
  if (typeof fn === "function") {
    return fn(...args);
  }
};

/**
 * Sets a ref using either a ref callback or a ref object
 */
export const setRef = (ref: any, node: any): void => {
  // if its a function call it
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  }
  // otherwise we should treat it as a ref object
  else if (ref != null) {
    ref.current = node;
  }
};

/**
 * Simple ponyfill for Object.fromEntries
 */
export const fromEntries = (
  entries: Array<[string, any]>
): { [key: string]: any } =>
  entries.reduce((acc: any, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
