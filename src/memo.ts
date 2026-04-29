import type { MemoOptions, MemoControls, CacheStats } from './types';
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
  options: MemoOptions<Parameters<T>, ReturnType<T>> = {},
): T & MemoControls {
  const ttl = parseTtl(options.ttl);
  const cache = new CacheMap<any>(options.maxSize, ttl);
  const keyFn = options.key ?? defaultKey;
  const shouldCache = options.shouldCache;

  const memoized = function (this: unknown, ...args: any[]): any {
    const k = (keyFn as (...a: any[]) => string)(...args);
    const cached = cache.get(k);
    if (cached !== undefined) return cached;

    const result = fn.apply(this, args);

    if (result instanceof Promise) {
      const tracked = result.then(
        (resolved: any) => {
          if (shouldCache && !shouldCache(resolved)) {
            cache.delete(k);
          }
          return resolved;
        },
        (err: any) => {
          cache.delete(k);
          throw err;
        },
      );
      cache.set(k, tracked);
      return tracked;
    }

    if (shouldCache && !shouldCache(result)) {
      return result;
    }

    cache.set(k, result);
    return result;
  } as T & MemoControls;

  memoized.clear = () => cache.clear();
  memoized.delete = (...args: unknown[]) => cache.delete((keyFn as (...a: any[]) => string)(...args));
  memoized.peek = (...args: unknown[]) => cache.peek((keyFn as (...a: any[]) => string)(...args));
  memoized.has = (...args: unknown[]) => cache.has((keyFn as (...a: any[]) => string)(...args));
  memoized.stats = (): CacheStats => cache.stats();
  Object.defineProperty(memoized, 'size', { get: () => cache.size });

  return memoized;
}
