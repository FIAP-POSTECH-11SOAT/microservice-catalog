import { makeCategory } from 'test/factories/make-category'
import { makeItem } from 'test/factories/make-item'
import { InMemoryCategoriesRepository } from '@/infra/database/in-memory/in-memory-categories.repository'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { type UpdateItemInput, UpdateItemUseCase } from './update-item.use-case'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryItemsRepository: InMemoryItemsRepository
let sut: UpdateItemUseCase

describe('Update Item Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new UpdateItemUseCase(inMemoryItemsRepository, inMemoryCategoriesRepository)
  })

  it('should update an item', async () => {
    const category = makeCategory({ name: 'Test Category' })
    await inMemoryCategoriesRepository.save(category)

    const category2 = makeCategory({ name: 'Test Category 2' })
    await inMemoryCategoriesRepository.save(category2)

    const item = makeItem({
      name: 'Test Name',
      categoryId: category.id,
      description: 'Test Description',
      price: 20,
      image: '/public/original.png',
    })
    await inMemoryItemsRepository.save(item)

    const previousUpdatedAt = item.updatedAt

    const result = await sut.execute({
      id: item.id,
      categoryId: category2.id,
      name: 'Updated Name',
      description: 'Updated Description',
      price: 22,
      image: '/public/updated.png',
    })

    expect(result.name).toBe('Updated Name')
    expect(result.categoryId).toBe(category2.id)
    expect(result.description).toBe('Updated Description')
    expect(result.price).toBe(22)
    expect(result.image).toBe('/public/updated.png')
    expect(result.updatedAt.getTime()).not.toBe(previousUpdatedAt.getTime())
  })

  it('should throw an error when trying to update a non-existent item', async () => {
    const input: UpdateItemInput = {
      id: 'non-existing-id',
      name: 'Updated Name',
    }
    await expect(sut.execute(input)).rejects.toThrow(new Error('Item not found'))
  })

  it('should throw an error when trying to update a item with non-existent category', async () => {
    const item = makeItem()
    await inMemoryItemsRepository.save(item)

    const input: UpdateItemInput = {
      id: item.id,
      categoryId: 'non-existing-category-id',
    }

    await expect(sut.execute(input)).rejects.toThrow(new Error('Category not found'))
  })

  it('should throw an error when trying to update an item with existing name', async () => {
    const item = makeItem({
      name: 'Test Name 1',
    })
    await inMemoryItemsRepository.save(item)

    const item2 = makeItem({
      name: 'Test Name 2',
    })
    await inMemoryItemsRepository.save(item2)

    const input: UpdateItemInput = {
      id: item.id,
      name: 'Test Name 2',
    }

    await expect(sut.execute(input)).rejects.toThrow(new Error('Item with this name already exists'))
  })

  it('should throw an error when trying to update an item with deleted category', async () => {
    const category = makeCategory({ name: 'Test Category' })
    await inMemoryCategoriesRepository.save(category)

    const category2 = makeCategory({ name: 'Test Category', deletedAt: new Date() })
    await inMemoryCategoriesRepository.save(category2)

    const item = makeItem({
      name: 'Test Name 1',
      categoryId: category.id,
    })
    await inMemoryItemsRepository.save(item)

    const input: UpdateItemInput = {
      id: item.id,
      categoryId: category2.id,
    }

    await expect(sut.execute(input)).rejects.toThrow(new Error('Invalid category'))
  })

  it('should throw an error when trying to update a deleted item', async () => {
    const item = makeItem({
      deletedAt: new Date(),
    })
    await inMemoryItemsRepository.save(item)

    const input: UpdateItemInput = {
      id: item.id,
      name: 'Updated Name',
    }

    await expect(sut.execute(input)).rejects.toThrow(new Error('Item deleted'))
  })
})
