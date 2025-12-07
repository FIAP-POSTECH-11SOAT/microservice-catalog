import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from 'src/shared/entities/unique-entity-id'
import { Category, type CreateCategoryProps } from '@/domain/category/category.entity'
import type { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeCategory(override: Partial<CreateCategoryProps> = {}, id?: UniqueEntityID) {
  const category = Category.create({
    id: id ? id.toString() : new UniqueEntityID().toString(),
    name: faker.commerce.productMaterial(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  })

  return category
}

@Injectable()
export class CategoryFactory {
  constructor(private prisma: PrismaService) {}

  // async makePrismaCategory(data: Partial<CreateCategoryProps> = {}): Promise<Category> {
  //   const category = makeCategory(data)

  //   await this.prisma.category.create({
  //     data: PrismaCategoryMapper.toPrisma(category),
  //   })

  //   return category
  // }
}
