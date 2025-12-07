import { Injectable } from '@nestjs/common'
import { Category } from '@/domain/category/category.entity'
import { CategoriesRepository } from '../repositories/categories.repository'

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ name }: { name: string }): Promise<void> {
    const existingCategory = await this.categoriesRepository.findByName(name)

    if (existingCategory) {
      if (existingCategory.deletedAt) {
        existingCategory.reactivate()
        await this.categoriesRepository.update(existingCategory)
        return
      }
      throw new Error('Category already exists')
    }

    const category = Category.create({ name })
    await this.categoriesRepository.save(category)
  }
}
