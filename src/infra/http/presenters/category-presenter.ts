import { Category } from '@/domain/category/category.entity'

export class CategoryPresenter {
  static toHTTP(category: Category) {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      deletedAt: category.deletedAt,
    }
  }
}
