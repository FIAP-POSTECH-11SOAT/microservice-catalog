import { UniqueEntityID } from 'src/shared/entities/unique-entity-id'
import { makeCategory } from 'test/factories/make-category'
import { makeItem } from 'test/factories/make-item'
import { InMemoryCategoriesRepository } from '@/infra/database/in-memory/in-memory-categories.repository'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { DeleteCategoryUseCase } from './delete-category.use-case'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryItemsRepository: InMemoryItemsRepository
let sut: DeleteCategoryUseCase

describe('Soft Delete Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new DeleteCategoryUseCase(inMemoryCategoriesRepository, inMemoryItemsRepository)
  })

  it('should be able to delete a category', async () => {
    const category = makeCategory({}, new UniqueEntityID('category-1'))
    await inMemoryCategoriesRepository.save(category)

    await sut.execute(category.id)

    expect(category.deletedAt).toBeDefined()
    expect(inMemoryCategoriesRepository.categories).toHaveLength(1)
    expect(inMemoryCategoriesRepository.categories[0].deletedAt).toBeDefined()
  })

  it('should not be able to delete non-existent category', async () => {
    const id = 'non-existing-id'
    expect(() => sut.execute(id)).rejects.toThrow(new Error('Category not found'))
  })

  it('should throw an error if category has already been deleted', async () => {
    const category = makeCategory()
    await inMemoryCategoriesRepository.save(category)

    await sut.execute(category.id)

    expect(() => sut.execute(category.id)).rejects.toThrow(new Error('Category already deleted'))
  })

  it('should throw an error if category has active items', async () => {
    const category = makeCategory({}, new UniqueEntityID('category-1'))
    await inMemoryCategoriesRepository.save(category)

    const newItem = makeItem({ categoryId: category.id })
    await inMemoryItemsRepository.save(newItem)

    await expect(() => sut.execute(category.id)).rejects.toThrow(
      new Error('This category still has active items. Please deactivate or remove them before deleting the category')
    )
  })
})
