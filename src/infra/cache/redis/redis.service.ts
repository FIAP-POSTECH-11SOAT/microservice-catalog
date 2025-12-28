import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'
import { EnvService } from '@/infra/env/env.service'
import { CacheRepository } from './redis.repository'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy, CacheRepository {
  private client: RedisClientType

  constructor(readonly envService: EnvService) {
    this.client = createClient({
      url: envService.get('REDIS_URL'),
    })

    this.client.on('error', err => {
      console.error('Redis Client Error', err)
    })
  }

  onModuleInit() {
    return this.client.connect()
  }

  onModuleDestroy() {
    return this.client.destroy()
  }

  getClient() {
    return this.client
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key)
    if (!value) return null
    return JSON.parse(value) as T
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value)

    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, payload, {
        expiration: {
          type: 'EX',
          value: ttlSeconds,
        },
      })

      return
    }

    await this.client.set(key, payload)
  }

  async del(key: string): Promise<void> {
    await this.client.del(key)
  }
}
