export class MemoryCache {
  private cacheStorage: Map<string, any> = new Map();

  get<T>(key: string): T | undefined {
    return this.cacheStorage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.cacheStorage.set(key, value);
  }

  has(key: string): boolean {
    return this.cacheStorage.has(key);
  }
}
