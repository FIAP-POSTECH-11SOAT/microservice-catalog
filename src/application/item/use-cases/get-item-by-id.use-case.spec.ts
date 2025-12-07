import { makeItem } from 'test/factories/make-item'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { GetItemByIdUseCase } from './get-item-by-id.use-case'

let inMemoryItemsRepository: InMemoryItemsRepository
let sut: GetItemByIdUseCase

describe('Get Item by ID Use Case', () => {
  beforeEach(() => {
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new GetItemByIdUseCase(inMemoryItemsRepository)
  })

  it('should get an item by id', async () => {
    const item = makeItem({ name: 'Test Item' })
    await inMemoryItemsRepository.save(item)
    const result = await sut.execute(item.id)

    expect(result).toBeDefined()
    expect(result.name).toBe('Test Item')
  })

  it('should throw an error if item does not exist', async () => {
    const id = 'non-existing-id'
    await expect(sut.execute(id)).rejects.toThrow(new Error('Item not found'))
  })
})
