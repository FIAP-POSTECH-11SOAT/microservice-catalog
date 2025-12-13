import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'
import { ItemMapper } from '../utils/items.mapper'

@Injectable()
export class GetItemByIdUseCase {
  private readonly TTL_SECONDS = 120

  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(itemId: string): Promise<Item> {
    const key = ItemsCacheKeys.itemById(itemId)
    const cached = await this.cache.get<Item>(key)
    if (cached) return cached

    const item = await this.itemsRepository.findById(itemId)
    if (!item) throw new Error('Item not found')

    await this.cache.set(key, ItemMapper.toDTO(item), this.TTL_SECONDS)

    return item
  }
}
