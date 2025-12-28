import { CacheRepository } from '../redis/redis.repository'

export class InMemoryCacheRepository implements CacheRepository {
  private store = new Map<string, unknown>()

  async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T) ?? null
  }

  async set(key: string, value: unknown, ttlInSeconds?: number): Promise<void> {
    this.store.set(key, value)
  }

  async del(key: string): Promise<void> {
    this.store.delete(key)
  }
}
