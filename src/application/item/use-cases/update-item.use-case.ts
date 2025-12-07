import { Injectable } from '@nestjs/common'
import type { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import type { Item } from '@/domain/item/item.entity'
import type { ItemsRepository } from '../repositories/items.repository'

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
    private itemsRepository: ItemsRepository,
    private categoriesRepository: CategoriesRepository
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

    return item
  }
}
