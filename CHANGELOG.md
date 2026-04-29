# Changelog

## 0.3.0

- Add `peek(...args)` to read a cached value without affecting LRU recency or stats
- Add `has(...args)` to check cache membership without affecting LRU recency
- Honor a custom `key` option in `delete()` (previously fell back to the default key function)
- Run `npm test` in the publish workflow before publishing to npm
- Fix README badge and Support links to point to the actual `ts-memo` repository

## 0.2.0

- Add cache statistics with hits, misses, evictions, and size tracking
- Add conditional memoization with shouldCache predicate
- Add async-aware invalidation for rejected promises
- Add LRU eviction when maxSize is reached

## 0.1.4

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.3

- Add Development section to README
- Fix CI badge to reference publish.yml
- Add test script to package.json

## 0.1.0 (2026-03-15)

- Initial release
- Memoization with LRU eviction and TTL expiry
- WeakMap-based memoization for object keys
- Async-aware with promise deduplication
- Custom key serialization
