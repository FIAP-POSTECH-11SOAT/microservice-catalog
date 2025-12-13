import { ItemsRepository } from '@/application/item/repositories/items.repository'
import type { Item } from '@/domain/item/item.entity'

export class InMemoryItemsRepository implements ItemsRepository {
  items: Item[] = []

  async findAll(): Promise<Item[]> {
    return this.items
  }

  async findById(id: string): Promise<Item | null> {
    const item = this.items.find(item => item.id === id)
    if (!item) return null
    return item
  }

  async findByCategoryId(categoryId: string): Promise<Item[]> {
    return this.items.filter(item => item.categoryId === categoryId)
  }

  async findByName(name: string): Promise<Item | null> {
    const item = this.items.find(item => item.name === name)
    if (!item) return null
    return item
  }

  async findDeleted(): Promise<Item[]> {
    return this.items.filter(item => item.deletedAt)
  }

  async save(item: Item): Promise<void> {
    this.items.push(item)
  }

  async update(item: Item): Promise<void> {
    const index = this.items.findIndex(i => i.id === item.id)
    if (index >= 0) this.items[index] = item
  }

  async delete(item: Item): Promise<void> {
    const index = this.items.findIndex(i => i.id === item.id)
    if (index >= 0) this.items[index] = item
  }
}
