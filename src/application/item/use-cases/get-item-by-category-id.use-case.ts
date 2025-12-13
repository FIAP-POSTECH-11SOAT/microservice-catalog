import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import type { Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'
import { ItemMapper } from '../utils/items.mapper'

@Injectable()
export class GetItemByCategoryIdUseCase {
  private readonly TTL_SECONDS = 120

  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(categoryId: string): Promise<Item[]> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new Error('Category does not exist')
    if (category.deletedAt) return []

    const key = ItemsCacheKeys.itemsByCategory(categoryId)
    const cached = await this.cache.get<Item[]>(key)
    if (cached) return cached

    const items = await this.itemsRepository.findByCategoryId(categoryId)
    await this.cache.set(key, items.map(ItemMapper.toDTO), this.TTL_SECONDS)

    return items
  }
}
