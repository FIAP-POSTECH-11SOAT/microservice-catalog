import { Injectable } from '@nestjs/common'
import type { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import { type CreateItemProps, Item } from '@/domain/item/item.entity'
import type { ItemsRepository } from '../repositories/items.repository'

@Injectable()
export class CreateItemUseCase {
  constructor(
    private itemsRepository: ItemsRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(createItem: CreateItemProps): Promise<Item> {
    const hasItem = await this.itemsRepository.findByName(createItem.name)
    if (hasItem) throw new Error('Item with this name already exists')

    const category = await this.categoriesRepository.findById(createItem.categoryId)
    if (!category || category.deletedAt) throw new Error('Invalid category')

    const newItem = Item.create(createItem)
    await this.itemsRepository.save(newItem)

    return newItem
  }
}
