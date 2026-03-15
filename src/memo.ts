import type { MemoOptions, MemoControls } from './types';
import { CacheMap } from './cache-map';
import { defaultKey } from './key';

function parseTtl(ttl: number | string | undefined): number | null {
  if (ttl === undefined) return null;
  if (typeof ttl === 'number') return ttl;
  const match = ttl.match(/^(\d+)(ms|s|m|h)$/);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  switch (match[2]) {
    case 'ms': return value;
    case 's': return value * 1000;
    case 'm': return value * 60_000;
    case 'h': return value * 3_600_000;
    default: return null;
  }
}

export function memo<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoOptions<Parameters<T>> = {},
): T & MemoControls {
  const ttl = parseTtl(options.ttl);
  const cache = new CacheMap<any>(options.maxSize, ttl);
  const keyFn = options.key ?? defaultKey;

  const memoized = function (this: unknown, ...args: any[]): any {
    const k = (keyFn as (...a: any[]) => string)(...args);
    const cached = cache.get(k);
    if (cached !== undefined) return cached;

    const result = fn.apply(this, args);

    if (result instanceof Promise) {
      cache.set(k, result);
      result.catch(() => cache.delete(k));
      return result;
    }

    cache.set(k, result);
    return result;
  } as T & MemoControls;

  memoized.clear = () => cache.clear();
  memoized.delete = (...args: unknown[]) => cache.delete(defaultKey(...args));
  Object.defineProperty(memoized, 'size', { get: () => cache.size });

  return memoized;
}
