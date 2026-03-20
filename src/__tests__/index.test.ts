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
});
