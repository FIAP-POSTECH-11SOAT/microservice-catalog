import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import type { ItemsRepository } from '../repositories/items.repository'

@Injectable()
export class GetItemsUseCase {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute(): Promise<Item[]> {
    return await this.itemsRepository.findAll()
  }
}
