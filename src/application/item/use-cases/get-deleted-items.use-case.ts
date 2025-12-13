import { Injectable } from '@nestjs/common'
import type { Item } from '@/domain/item/item.entity'
import { ItemsRepository } from '../repositories/items.repository'

@Injectable()
export class GetDeletedItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(): Promise<Item[]> {
    return await this.itemsRepository.findDeleted()
  }
}
