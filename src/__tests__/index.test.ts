import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('memo-ts', () => {
  it('should export memo', () => {
    assert.ok(mod.memo);
  });

  it('should export weakMemo', () => {
    assert.ok(mod.weakMemo);
  });

  it('peek() returns the cached value without affecting LRU', () => {
    let calls = 0;
    const fn = mod.memo(
      (n: number) => {
        calls += 1;
        return n * 2;
      },
      { maxSize: 2 },
    );
    fn(1);
    fn(2);
    fn.peek(1); // should not promote 1 ahead of 2
    fn(3);     // evicts the oldest by recency, which should still be 1
    fn(2);     // should still be cached → no extra call
    assert.equal(calls, 3);
  });

  it('peek() returns undefined for missing keys', () => {
    const fn = mod.memo((n: number) => n);
    assert.equal(fn.peek(99), undefined);
  });

  it('has() reports cache membership', () => {
    const fn = mod.memo((n: number) => n);
    fn(7);
    assert.equal(fn.has(7), true);
    assert.equal(fn.has(8), false);
  });

  it('peek() does not increment hit/miss stats', () => {
    const fn = mod.memo((n: number) => n);
    fn(1);
    const before = fn.stats();
    fn.peek(1);
    fn.peek(99);
    const after = fn.stats();
    assert.equal(after.hits, before.hits);
    assert.equal(after.misses, before.misses);
  });
});
