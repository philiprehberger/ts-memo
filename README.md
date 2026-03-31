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
