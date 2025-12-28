import { makeItem } from 'test/factories/make-item'
import { InMemoryCacheRepository } from '@/infra/cache/in-memory/in-memory-cache.repository'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { GetItemsUseCase } from './get-items.use-case'

let inMemoryItemsRepository: InMemoryItemsRepository
let inMemoryCacheRepository: InMemoryCacheRepository
let sut: GetItemsUseCase

describe('GetItemsService', () => {
  beforeEach(() => {
    inMemoryItemsRepository = new InMemoryItemsRepository()
    inMemoryCacheRepository = new InMemoryCacheRepository()
    sut = new GetItemsUseCase(inMemoryItemsRepository, inMemoryCacheRepository)
  })

  it('should get items', async () => {
    const item = makeItem({ name: 'Test Name' })
    await inMemoryItemsRepository.save(item)
    const item2 = makeItem({ name: 'Test Name 2' })
    await inMemoryItemsRepository.save(item2)

    const result = await sut.execute()

    expect(result.length).toBe(2)
    expect(result[0].name).toBe('Test Name')
    expect(result[1].name).toBe('Test Name 2')
  })
})
