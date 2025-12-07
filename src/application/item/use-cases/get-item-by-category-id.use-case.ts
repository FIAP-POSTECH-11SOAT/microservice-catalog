import { Injectable } from '@nestjs/common'
import type { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import type { Item } from '@/domain/item/item.entity'
import type { ItemsRepository } from '../repositories/items.repository'

@Injectable()
export class GetItemByCategoryIdUseCase {
  constructor(
    private itemsRepository: ItemsRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(categoryId: string): Promise<Item[]> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) throw new Error('Category does not exist')
    const items = await this.itemsRepository.findByCategoryId(categoryId)
    return items
  }
}
