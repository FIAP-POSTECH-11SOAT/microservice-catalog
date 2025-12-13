import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'

@Injectable()
export class DeleteItemUseCase {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(id: string): Promise<Item> {
    const item: Item | null = await this.itemsRepository.findById(id)
    if (!item) throw new Error('Item not found')

    item.softDelete()
    await this.itemsRepository.delete(item)

    await this.cache.del(ItemsCacheKeys.itemById(id))
    await this.cache.del(ItemsCacheKeys.itemsAll())
    await this.cache.del(ItemsCacheKeys.itemsByCategory(item.categoryId))

    return item
  }
}
