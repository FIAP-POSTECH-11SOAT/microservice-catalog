import { makeCategory } from 'test/factories/make-category'
import { makeItem } from 'test/factories/make-item'
import { Category } from '@/domain/category/category.entity'
import { InMemoryCategoriesRepository } from '@/infra/database/in-memory/in-memory-categories.repository'
import { InMemoryItemsRepository } from '@/infra/database/in-memory/in-memory-items.repository'
import { CreateItemUseCase } from './create-item.use-case'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryItemsRepository: InMemoryItemsRepository
let sut: CreateItemUseCase

describe('Create Item Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryItemsRepository = new InMemoryItemsRepository()
    sut = new CreateItemUseCase(inMemoryItemsRepository, inMemoryCategoriesRepository)
  })

  it('should create an item', async () => {
    const category = Category.create({ name: 'Test Category' })
    await inMemoryCategoriesRepository.save(category)

    const item = {
      name: 'Test Name',
      categoryId: category.id,
      description: 'Test Description',
      price: 10,
      image: '/test/image.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await sut.execute(item)

    expect(inMemoryItemsRepository.items).toHaveLength(1)
    expect(inMemoryItemsRepository.items[0].name).toEqual('Test Name')
    expect(inMemoryItemsRepository.items[0].categoryId).toEqual(category.id)
    expect(inMemoryItemsRepository.items[0].description).toEqual('Test Description')
    expect(inMemoryItemsRepository.items[0].price).toEqual(10)
    expect(inMemoryItemsRepository.items[0].image).toEqual('/test/image.png')
    expect(inMemoryItemsRepository.items[0].createdAt).toBeDefined()
    expect(inMemoryItemsRepository.items[0].updatedAt).toBeDefined()
  })

  it('should create an item without image', async () => {
    const category = Category.create({ name: 'Test Category' })
    await inMemoryCategoriesRepository.save(category)

    const item = {
      name: 'Test Name',
      categoryId: category.id,
      description: 'Test Description',
      price: 10,
      image: null,
    }
    await sut.execute(item)

    expect(inMemoryItemsRepository.items).toHaveLength(1)
    expect(inMemoryItemsRepository.items[0].image).toBeNull()
  })

  it('should throw an error if item with this name already exists', async () => {
    const item = makeItem({ name: 'Test Name' })
    await inMemoryItemsRepository.save(item)

    const category = makeCategory({ name: 'Category 1' })
    await inMemoryCategoriesRepository.save(category)

    const newItem = {
      name: 'Test Name',
      categoryId: category.id,
      description: 'Test Description',
      price: 10,
      image: null,
    }

    await expect(() => sut.execute(newItem)).rejects.toThrow(new Error('Item with this name already exists'))
  })

  it('should throw an error if category does not exist', async () => {
    const item = {
      name: 'Test Name',
      categoryId: 'non-existing-category-id',
      description: 'Test Description',
      price: 10,
      image: null,
    }

    await expect(() => sut.execute(item)).rejects.toThrow(new Error('Invalid category'))
  })

  it('should throw an error if category is deleted', async () => {
    const category = makeCategory({ name: 'Category 1', deletedAt: new Date() })
    await inMemoryCategoriesRepository.save(category)

    const item = {
      name: 'Test Name',
      categoryId: 'non-existing-category-id',
      description: 'Test Description',
      price: 10,
      image: null,
    }

    await expect(() => sut.execute(item)).rejects.toThrow(new Error('Invalid category'))
  })
})
