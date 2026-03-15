export function weakMemo<K extends object, R>(fn: (key: K, ...rest: unknown[]) => R): (key: K, ...rest: unknown[]) => R {
  const cache = new WeakMap<K, R>();

  return function (key: K, ...rest: unknown[]): R {
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(key, ...rest);
    cache.set(key, result);
    return result;
  };
}
