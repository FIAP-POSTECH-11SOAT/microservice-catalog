import { randomUUID } from 'node:crypto'
import { type CreateItemProps, Item, type RestoreItemProps } from './item.entity'

const createItemProps: CreateItemProps = {
  name: 'Test Name',
  description: 'Test Description',
  price: 10,
  image: '/public/test.png',
  categoryId: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
}

const restoretemProps: RestoreItemProps = {
  id: randomUUID(),
  categoryId: randomUUID(),
  name: 'Test Name',
  description: 'Test Description',
  price: 10,
  image: '/public/test.png',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('Item Entity', () => {
  it('should create an item', () => {
    const item = Item.create(createItemProps)

    expect(item).toBeDefined()
    expect(item.name).toBe(createItemProps.name)
    expect(item.description).toBe(createItemProps.description)
    expect(item.price).toBe(createItemProps.price)
    expect(item.image).toBe(createItemProps.image)
    expect(item.categoryId).toBe(createItemProps.categoryId)
    expect(item.createdAt).toBe(createItemProps.createdAt)
    expect(item.updatedAt).toBe(createItemProps.updatedAt)
    expect(item.deletedAt).toBe(null)
  })

  it('should create an item without image', () => {
    delete createItemProps.image
    const item = Item.create(createItemProps)

    expect(item.image).toBe(null)
  })

  it('should create an item with deletedAt', () => {
    const deletedAt = new Date()
    const item = Item.create({ ...createItemProps, deletedAt })

    expect(item.deletedAt).toBe(deletedAt)
  })

  it('should restore an item', () => {
    const item = Item.restore({
      ...restoretemProps,
    })

    expect(item).toBeDefined()
    expect(item.name).toBe(restoretemProps.name)
    expect(item.description).toBe(restoretemProps.description)
    expect(item.price).toBe(restoretemProps.price)
    expect(item.image).toBe(restoretemProps.image)
    expect(item.categoryId).toBe(restoretemProps.categoryId)
    expect(item.createdAt).toBe(restoretemProps.createdAt)
    expect(item.updatedAt).toBe(restoretemProps.updatedAt)
    expect(item.deletedAt).toBe(null)
  })

  it('should softDelete an item', () => {
    const item = Item.create({
      ...createItemProps,
    })
    item.softDelete()

    expect(item.deletedAt).toBeDefined()
  })

  it('should throw an error when trying to softDelete an item that is already deleted', () => {
    const item = Item.create({
      ...createItemProps,
      deletedAt: new Date(),
    })

    expect(() => item.softDelete()).toThrow(new Error('Item already deleted'))
  })

  it('should update an item with update method', () => {
    const item = Item.create({
      ...createItemProps,
    })

    const previousUpdatedAt = item.updatedAt
    const newCategoryId = randomUUID()

    item.update({
      name: 'Updated Name',
      description: 'Updated Description',
      price: 20,
      image: '/public/updated.png',
      categoryId: newCategoryId,
    })

    expect(item.name).toBe('Updated Name')
    expect(item.description).toBe('Updated Description')
    expect(item.price).toBe(20)
    expect(item.image).toBe('/public/updated.png')
    expect(item.categoryId).toBe(newCategoryId)
    expect(item.updatedAt).not.toBe(previousUpdatedAt)
  })

  it('should activate an item', () => {
    const item = Item.create({
      ...createItemProps,
      deletedAt: new Date(),
    })
    item.activate()

    expect(item.deletedAt).toBe(null)
  })
})
