# @philiprehberger/memo-ts

Advanced memoization with TTL, LRU, and WeakMap support.

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

## License

MIT
