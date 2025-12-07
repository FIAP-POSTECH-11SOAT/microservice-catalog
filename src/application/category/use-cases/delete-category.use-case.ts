import { Injectable } from '@nestjs/common'
import { ItemsRepository } from '@/application/item/repositories/items.repository'
import { CategoriesRepository } from '../repositories/categories.repository'

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly itemsRepository: ItemsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id)
    if (!category) throw new Error('Category not found')

    const items = await this.itemsRepository.findByCategoryId(id)
    const hasActiveItems = items.some(item => item.deletedAt === null)
    if (hasActiveItems) {
      throw new Error('This category still has active items. Please deactivate or remove them before deleting the category')
    }

    category.softDelete()

    await this.categoriesRepository.delete(category)
  }
}
