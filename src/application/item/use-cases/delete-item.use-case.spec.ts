import { makeItem } from 'test/factories/make-item'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { DeleteItemUseCase } from './delete-item.use-case'

let inMemoryItemsRepository: InMemoryItemsRepository
let sut: DeleteItemUseCase

describe('Delete Item Use Case', () => {
  beforeEach(() => {
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new DeleteItemUseCase(inMemoryItemsRepository)
  })

  it('should delete an item', async () => {
    const item = makeItem()
    await inMemoryItemsRepository.save(item)
    const result = await sut.execute(item.id)
    expect(result.deletedAt).not.toBeNull()
  })

  it('should throw an error when item does not exist', async () => {
    const id = 'non-existing-id'
    await expect(sut.execute(id)).rejects.toThrow(new Error('Item not found'))
  })

  it('should throw an error when item is deleted', async () => {
    const item = makeItem({ deletedAt: new Date() })
    await inMemoryItemsRepository.save(item)
    await expect(sut.execute(item.id)).rejects.toThrow(new Error('Item already deleted'))
  })
})
