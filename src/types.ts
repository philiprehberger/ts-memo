export interface MemoOptions<Args extends unknown[] = unknown[]> {
  ttl?: number | string;
  maxSize?: number;
  key?: (...args: Args) => string;
}

export interface MemoControls {
  clear(): void;
  delete(...args: unknown[]): boolean;
  readonly size: number;
}

export type KeyFunction<Args extends unknown[]> = (...args: Args) => string;
