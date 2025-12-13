import { Item } from '@/domain/item/item.entity'

export class ItemPresenter {
  static toHTTP(item: Item) {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      categoryId: item.categoryId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
    }
  }
}
