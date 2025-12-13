import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import { type CreateItemProps, Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'

@Injectable()
export class CreateItemUseCase {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(createItem: CreateItemProps): Promise<Item> {
    const hasItem = await this.itemsRepository.findByName(createItem.name)
    if (hasItem) throw new Error('Item with this name already exists')

    const category = await this.categoriesRepository.findById(createItem.categoryId)
    if (!category || category.deletedAt) throw new Error('Invalid category')

    const newItem = Item.create(createItem)
    await this.itemsRepository.save(newItem)

    await this.cache.del(ItemsCacheKeys.itemsAll())
    await this.cache.del(ItemsCacheKeys.itemsByCategory(createItem.categoryId))

    return newItem
  }
}
