# @philiprehberger/memo-ts

[![CI](https://github.com/philiprehberger/ts-memo/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-memo/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/memo-ts.svg)](https://www.npmjs.com/package/@philiprehberger/memo-ts)
[![License](https://img.shields.io/github/license/philiprehberger/ts-memo)](LICENSE)

Advanced memoization with TTL, LRU, and WeakMap support

## Installation

```bash
npm install @philiprehberger/memo-ts
```

## Usage

```ts
import { memo, weakMemo } from '@philiprehberger/memo-ts';

const getUser = memo(fetchUser, { ttl: '5m', maxSize: 1000 });
const user = await getUser('123'); // cached
getUser.clear();

const getNodeData = weakMemo((node: HTMLElement) => expensiveCalc(node));
// Auto-GC when node is removed from DOM
```

## API

| Function | Description |
|----------|-------------|
| `memo(fn, options?)` | Memoize with optional TTL and LRU |
| `weakMemo(fn)` | WeakMap-based memoization |
| `.clear()` | Clear all cached entries |
| `.delete(...args)` | Remove specific cache entry |
| `.size` | Number of cached entries |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
