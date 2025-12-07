import type { Item } from '@/domain/item/item.entity'

export abstract class ItemsRepository {
  abstract findAll(): Promise<Item[]>
  abstract findById(id: string): Promise<Item | null>
  abstract findByCategoryId(categoryId: string): Promise<Item[]>
  abstract findByName(name: string): Promise<Item | null>
  abstract findDeleted(): Promise<Item[]>
  abstract save(item: Item): Promise<void>
  abstract delete(item: Item): Promise<void>
  abstract update(item: Item): Promise<void>
}
