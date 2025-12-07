import type { Prisma, Item as PrismaItem } from 'generated/prisma/client'
import { Item } from '@/domain/item/item.entity'

export default class PrismaItemsMapper {
  static toDomain(raw: PrismaItem): Item {
    return Item.restore({ ...raw, price: Number(raw.price) })
  }

  static toPrisma(item: Item): Prisma.ItemUncheckedCreateInput {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
    }
  }
}
