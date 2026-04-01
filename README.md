# @philiprehberger/memo-ts

[![CI](https://github.com/philiprehberger/memo-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/memo-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/memo-ts.svg)](https://www.npmjs.com/package/@philiprehberger/memo-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/memo-ts)](https://github.com/philiprehberger/memo-ts/commits/main)

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

### Cache Statistics

Track cache performance with hits, misses, evictions, and current size:

```ts
const compute = memo(expensiveFn, { maxSize: 100 });

compute(1); // miss
compute(1); // hit
compute(2); // miss

const { hits, misses, evictions, size } = compute.stats();
// { hits: 1, misses: 2, evictions: 0, size: 2 }
```

### Conditional Memoization

Skip caching based on the result value using a `shouldCache` predicate:

```ts
const fetchData = memo(apiFetch, {
  shouldCache: (result) => result.status === 'ok',
});

// Only successful responses are cached; errors pass through uncached
const data = await fetchData('/endpoint');
```

### Async-Aware Invalidation

Rejected promises are automatically evicted so the next call retries:

```ts
const loadConfig = memo(fetchConfig, { ttl: '10m' });

// If fetchConfig rejects, the failed promise is removed from cache
// so subsequent calls retry instead of returning the rejected promise
const config = await loadConfig();
```

### LRU Eviction

When `maxSize` is set, the least-recently-used entry is evicted to make room:

```ts
const cached = memo(expensiveFn, { maxSize: 3 });

cached('a'); // cache: [a]
cached('b'); // cache: [b, a]
cached('c'); // cache: [c, b, a]
cached('a'); // hit, promotes a -> cache: [a, c, b]
cached('d'); // evicts 'b' (LRU) -> cache: [d, a, c]
```

## API

| Function | Description |
|----------|-------------|
| `memo(fn, options?)` | Memoize with optional TTL and LRU |
| `weakMemo(fn)` | WeakMap-based memoization |
| `.clear()` | Clear all cached entries |
| `.delete(...args)` | Remove specific cache entry |
| `.stats()` | Return `{ hits, misses, evictions, size }` |
| `.size` | Number of cached entries |

### Options

| Option | Type | Description |
|--------|------|-------------|
| `ttl` | `number \| string` | Time-to-live (`5000`, `'5m'`, `'1h'`) |
| `maxSize` | `number` | Max entries before LRU eviction |
| `key` | `(...args) => string` | Custom cache key function |
| `shouldCache` | `(result) => boolean` | Predicate to conditionally skip caching |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/memo-ts)

🐛 [Report issues](https://github.com/philiprehberger/memo-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/memo-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
