import { Injectable } from '@nestjs/common'
import type { CategoriesRepository } from '../repositories/categories.repository'

interface UpdateCategoryInput {
  id: string
  name: string
}

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ id, name }: UpdateCategoryInput): Promise<void> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) throw new Error('Category not found')
    if (category.deletedAt) throw new Error('Cannot update a deleted category')

    const existingCategory = await this.categoriesRepository.findByName(name)
    if (existingCategory) throw new Error('Category already exists')

    category.name = name
    await this.categoriesRepository.update(category)
  }
}
