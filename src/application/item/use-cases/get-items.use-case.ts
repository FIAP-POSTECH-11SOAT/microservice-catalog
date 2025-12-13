import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'
import { ItemMapper } from '../utils/items.mapper'

@Injectable()
export class GetItemsUseCase {
  private readonly TTL_SECONDS = 120

  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(): Promise<Item[]> {
    const key = ItemsCacheKeys.itemsAll()
    const cached = await this.cache.get<Item[]>(key)
    if (cached) return cached
    console.log('db')

    const items = await this.itemsRepository.findAll()
    await this.cache.set(key, items.map(ItemMapper.toDTO), this.TTL_SECONDS)

    return items
  }
}
