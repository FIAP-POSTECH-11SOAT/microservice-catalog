import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import type { ItemsRepository } from '../repositories/items.repository'

@Injectable()
export class GetItemByIdUseCase {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute(id: string): Promise<Item> {
    const item = await this.itemsRepository.findById(id)

    if (!item) throw new Error('Item not found')

    return item
  }
}
