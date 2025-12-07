import { makeItem } from 'test/factories/make-item'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { GetDeletedItemsUseCase } from './get-deleted-items.use-case'

let inMemoryItemsRepository: InMemoryItemsRepository
let sut: GetDeletedItemsUseCase

describe('Get Deleted Items Use Case', () => {
  beforeEach(() => {
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new GetDeletedItemsUseCase(inMemoryItemsRepository)
  })

  it('should get deleted items', async () => {
    const item = makeItem({ name: 'Test Name', deletedAt: new Date() })
    await inMemoryItemsRepository.save(item)
    const item2 = makeItem()
    await inMemoryItemsRepository.save(item2)
    const result = await sut.execute()
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Test Name')
    expect(result[0].deletedAt).toBeDefined()
  })
})
