import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import type { Item } from '@/domain/item/item.entity'
import { CacheRepository } from '@/infra/cache/redis/redis.repository'
import { ItemsRepository } from '../repositories/items.repository'
import { ItemsCacheKeys } from '../repositories/items-cache-keys'

export interface UpdateItemInput {
  id: string
  name?: string
  description?: string
  price?: number
  image?: string | null
  categoryId?: string
}

@Injectable()
export class UpdateItemUseCase {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly cache: CacheRepository
  ) {}

  async execute(input: UpdateItemInput): Promise<Item> {
    const { id, name, description, price, image, categoryId } = input

    const item = await this.itemsRepository.findById(id)

    if (!item) throw new Error('Item not found')
    if (item.deletedAt) throw new Error('Item deleted')

    if (categoryId && categoryId !== item.categoryId) {
      const category = await this.categoriesRepository.findById(categoryId)

      if (!category) throw new Error('Category not found')
      if (category.deletedAt) throw new Error('Invalid category')
    }

    if (name) {
      const existingItemWithSameName = await this.itemsRepository.findByName(name)

      if (existingItemWithSameName && existingItemWithSameName.id !== id) {
        throw new Error('Item with this name already exists')
      }
    }

    item.update({
      name,
      description,
      price,
      image,
      categoryId,
    })

    await this.itemsRepository.update(item)

    await this.cache.del(ItemsCacheKeys.itemById(id))
    await this.cache.del(ItemsCacheKeys.itemsAll())
    await this.cache.del(ItemsCacheKeys.itemsByCategory(item.categoryId))

    return item
  }
}
