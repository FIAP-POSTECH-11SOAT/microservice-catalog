import { makeItem } from 'test/factories/make-item'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { ActivateItemUseCase } from './activate-item.use-case'

let inMemoryItemsRepository: InMemoryItemsRepository
let sut: ActivateItemUseCase

describe('Activate Item Use Case', () => {
  beforeEach(() => {
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new ActivateItemUseCase(inMemoryItemsRepository)
  })

  it('should activate an item', async () => {
    const item = makeItem({ deletedAt: new Date() })
    await inMemoryItemsRepository.save(item)
    const result = await sut.execute(item.id)
    expect(result.deletedAt).toEqual(null)
  })

  it('should throw an error when item not found', async () => {
    const id = 'non-existing-id'
    await expect(sut.execute(id)).rejects.toThrow(new Error('Item not found'))
  })

  it('should throw an error when item is not deleted', async () => {
    const item = makeItem()
    await inMemoryItemsRepository.save(item)
    await expect(sut.execute(item.id)).rejects.toThrow(new Error('Item not deleted'))
  })
})
