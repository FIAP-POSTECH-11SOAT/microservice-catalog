import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import type { Category } from '@/domain/category/category.entity'
import { PrismaCategoryMapper } from '../mappers/prisma-categories.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        deletedAt: null,
      },
    })

    return categories.map(category => PrismaCategoryMapper.toDomain(category))
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) return null

    return PrismaCategoryMapper.toDomain(category)
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        name,
      },
    })

    if (!category) return null

    return PrismaCategoryMapper.toDomain(category)
  }

  async save(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.create({ data })
  }

  async update(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.update({
      where: { id: category.id },
      data,
    })
  }

  async delete(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.update({
      where: { id: category.id },
      data,
    })
  }
}
