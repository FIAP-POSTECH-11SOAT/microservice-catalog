import { makeItem } from 'test/factories/make-item'
import { Category } from '@/domain/category/category.entity'
import { InMemoryCacheRepository } from '@/infra/cache/in-memory/in-memory-cache.repository'
import { InMemoryCategoriesRepository } from '@/infra/database/in-memory/in-memory-categories.repository'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { GetItemByCategoryIdUseCase } from './get-item-by-category-id.use-case'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryItemsRepository: InMemoryItemsRepository
let inMemoryCacheRepository: InMemoryCacheRepository
let sut: GetItemByCategoryIdUseCase

describe('Get Item by Category Id Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryItemsRepository = new InMemoryItemsRepository()
    inMemoryCacheRepository = new InMemoryCacheRepository()
    sut = new GetItemByCategoryIdUseCase(inMemoryItemsRepository, inMemoryCategoriesRepository, inMemoryCacheRepository)
  })

  it('should get items by category', async () => {
    const category = Category.create({ name: 'Test Category' })
    await inMemoryCategoriesRepository.save(category)

    const category2 = Category.create({ name: 'Test Category 2' })
    await inMemoryCategoriesRepository.save(category2)

    const item = makeItem({ categoryId: category.id, deletedAt: new Date() })
    await inMemoryItemsRepository.save(item)

    const item2 = makeItem({ categoryId: category2.id, deletedAt: new Date() })
    await inMemoryItemsRepository.save(item2)

    const result = await sut.execute(category.id)
    expect(result.length).toBe(1)
    expect(result[0].categoryId).toBe(category.id)
  })

  it('should throw an empty array when category is deleted', async () => {
    const category = Category.create({ name: 'Test Category', deletedAt: new Date() })
    await inMemoryCategoriesRepository.save(category)

    const item = makeItem({ categoryId: category.id })
    await inMemoryItemsRepository.save(item)

    const result = await sut.execute(category.id)
    expect(result.length).toBe(0)
  })

  it('should throw an error when category does not exist', async () => {
    const id = 'non-existing-id'
    await expect(sut.execute(id)).rejects.toThrow(new Error('Category does not exist'))
  })
})
