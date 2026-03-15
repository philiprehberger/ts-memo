interface CacheEntry<V> {
  value: V;
  expiresAt: number | null;
  prev: string | null;
  next: string | null;
}

export class CacheMap<V> {
  private map = new Map<string, CacheEntry<V>>();
  private head: string | null = null;
  private tail: string | null = null;
  private readonly maxSize: number;
  private readonly ttl: number | null;

  constructor(maxSize: number = Infinity, ttl: number | null = null) {
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get size(): number {
    return this.map.size;
  }

  get(key: string): V | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.delete(key);
      return undefined;
    }
    this.moveToHead(key);
    return entry.value;
  }

  set(key: string, value: V): void {
    if (this.map.has(key)) {
      const entry = this.map.get(key)!;
      entry.value = value;
      entry.expiresAt = this.ttl ? Date.now() + this.ttl : null;
      this.moveToHead(key);
      return;
    }

    if (this.map.size >= this.maxSize && this.tail) {
      this.delete(this.tail);
    }

    const entry: CacheEntry<V> = {
      value,
      expiresAt: this.ttl ? Date.now() + this.ttl : null,
      prev: null,
      next: this.head,
    };

    if (this.head) {
      this.map.get(this.head)!.prev = key;
    }
    this.head = key;
    if (!this.tail) this.tail = key;
    this.map.set(key, entry);
  }

  delete(key: string): boolean {
    const entry = this.map.get(key);
    if (!entry) return false;

    if (entry.prev) this.map.get(entry.prev)!.next = entry.next;
    else this.head = entry.next;

    if (entry.next) this.map.get(entry.next)!.prev = entry.prev;
    else this.tail = entry.prev;

    this.map.delete(key);
    return true;
  }

  clear(): void {
    this.map.clear();
    this.head = null;
    this.tail = null;
  }

  private moveToHead(key: string): void {
    if (this.head === key) return;
    const entry = this.map.get(key)!;

    if (entry.prev) this.map.get(entry.prev)!.next = entry.next;
    if (entry.next) this.map.get(entry.next)!.prev = entry.prev;
    if (this.tail === key) this.tail = entry.prev;

    entry.prev = null;
    entry.next = this.head;
    if (this.head) this.map.get(this.head)!.prev = key;
    this.head = key;
  }
}
