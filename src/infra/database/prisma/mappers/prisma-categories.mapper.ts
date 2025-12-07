import type { Prisma, Category as PrismaCategory } from 'generated/prisma/client'
import { Category } from '@/domain/category/category.entity'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.restore({
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    })
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      deletedAt: category.deletedAt,
    }
  }
}
