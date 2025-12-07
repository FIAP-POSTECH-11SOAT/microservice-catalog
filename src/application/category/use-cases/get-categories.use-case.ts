import { Injectable } from '@nestjs/common'
import type { Category } from '@/domain/category/category.entity'
import { CategoriesRepository } from '../repositories/categories.repository'

@Injectable()
export class GetCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll()
    return categories
  }
}
