import { Category } from './category.entity'

const createCategoryProps = {
  name: 'Test Category',
}

const restoreCategoryProps = {
  id: 'category-1',
  name: 'Test Category',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('Category Entity', () => {
  it('should create a category', () => {
    const category = Category.create(createCategoryProps)

    expect(category).toBeDefined()
    expect(category.name).toBe(createCategoryProps.name)
    expect(category.createdAt).toBeDefined()
    expect(category.updatedAt).toBeDefined()
    expect(category.deletedAt).toBe(null)
  })

  it('should restore a category', () => {
    const category = Category.restore(restoreCategoryProps)

    expect(category).toBeDefined()
    expect(category.name).toBe(restoreCategoryProps.name)
    expect(category.id).toBe(restoreCategoryProps.id)
  })

  it('should softDelete a category', () => {
    const category = Category.create(createCategoryProps)
    category.softDelete()

    expect(category.deletedAt).toBeDefined()
  })

  it('should throw an error when name is empty', () => {
    const category = Category.create(createCategoryProps)

    expect(() => {
      category.name = ''
    }).toThrow(new Error('Name is required'))
  })

  it('should throw an error when softDelete is called on an already deleted category', () => {
    const category = Category.create(createCategoryProps)
    category.softDelete()

    expect(() => category.softDelete()).toThrow(new Error('Category already deleted'))
  })

  it('should reactivate a category', () => {
    const category = Category.create(createCategoryProps)
    category.softDelete()
    category.reactivate()

    expect(category.deletedAt).toBeDefined()
  })

  it('should throw an error when reactivate is called on an active category', () => {
    const category = Category.create(createCategoryProps)

    expect(() => category.reactivate()).toThrow(new Error('Category is already active'))
  })
})
