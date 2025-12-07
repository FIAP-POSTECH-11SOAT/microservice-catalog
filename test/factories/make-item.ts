import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from 'src/shared/entities/unique-entity-id'
import { type CreateItemProps, Item } from '@/domain/item/item.entity'
import type { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeItem(override: Partial<CreateItemProps> = {}, id?: UniqueEntityID) {
  const fakeDate = faker.date.past()
  const item = Item.create({
    id: id ? id.toString() : new UniqueEntityID().toString(),
    categoryId: faker.commerce.productMaterial(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    image: faker.internet.url(),
    createdAt: fakeDate,
    updatedAt: fakeDate,
    ...override,
  })

  return item
}

@Injectable()
export class ItemFactory {
  constructor(private prisma: PrismaService) {}

  // async makePrismaItem(data: Partial<CreateItemProps> = {}): Promise<Item> {
  //   const item = makeItem(data)

  //   await this.prisma.item.create({
  //     data: PrismaItemMapper.toPrisma(item),
  //   })

  //   return item
  // }
}
