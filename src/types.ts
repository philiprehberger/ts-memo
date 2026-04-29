export interface MemoOptions<Args extends unknown[] = unknown[], R = unknown> {
  ttl?: number | string;
  maxSize?: number;
  key?: (...args: Args) => string;
  shouldCache?: (result: R) => boolean;
}

export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
}

export interface MemoControls {
  clear(): void;
  delete(...args: unknown[]): boolean;
  peek(...args: unknown[]): unknown;
  has(...args: unknown[]): boolean;
  stats(): CacheStats;
  readonly size: number;
}

export type KeyFunction<Args extends unknown[]> = (...args: Args) => string;
