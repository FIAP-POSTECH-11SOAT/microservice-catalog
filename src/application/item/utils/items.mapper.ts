import { Item, RestoreItemProps } from '@/domain/item/item.entity'

export class ItemMapper {
  static toDomain(raw: RestoreItemProps): Item {
    return Item.restore(raw)
  }

  static toDTO(item: Item) {
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
