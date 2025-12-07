import { Price } from '../../shared/entities/price'
import { UniqueEntityID } from '../../shared/entities/unique-entity-id'
import { ValidString } from '../../shared/entities/valid-string'

type ItemProps = {
  name: ValidString
  description: ValidString
  price: Price
  image: ValidString | null
  categoryId: UniqueEntityID
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export type CreateItemProps = {
  id?: string
  name: string
  description: string
  price: number
  image?: string | null
  categoryId: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type RestoreItemProps = {
  id: string
  name: string
  description: string
  price: number
  image: string | null
  categoryId: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export type UpdateItemProps = {
  name?: string
  description?: string
  price?: number
  image?: string | null
  categoryId?: string
}

export class Item {
  private _id: UniqueEntityID
  private props: ItemProps

  private constructor(props: ItemProps, id: UniqueEntityID) {
    this.props = props
    this._id = id
  }

  get id(): string {
    return this._id.toString()
  }

  get name(): string {
    return this.props.name.value()
  }

  set name(name: string) {
    this.props.name = ValidString.create(name)
  }

  get description(): string {
    return this.props.description.value()
  }

  set description(description: string) {
    this.props.description = ValidString.create(description)
  }

  get price(): number {
    return this.props.price.value()
  }

  set price(price: number) {
    this.props.price = Price.create(price)
  }

  get image(): string | null {
    return this.props.image?.value() ?? null
  }

  set image(image: string | null) {
    this.props.image = image ? ValidString.create(image) : null
  }

  get categoryId(): string {
    return this.props.categoryId.toString()
  }

  set categoryId(categoryId: string) {
    this.props.categoryId = new UniqueEntityID(categoryId)
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt ?? null
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: CreateItemProps): Item {
    const itemProps: ItemProps = {
      name: ValidString.create(props.name),
      description: ValidString.create(props.description),
      price: Price.create(props.price),
      image: props.image ? ValidString.create(props.image) : null,
      categoryId: new UniqueEntityID(props.categoryId),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? null,
    }
    const id = props.id ? new UniqueEntityID(props.id) : new UniqueEntityID()
    return new Item(itemProps, id)
  }

  static restore(props: RestoreItemProps): Item {
    const item = new Item(
      {
        categoryId: new UniqueEntityID(props.categoryId),
        name: ValidString.create(props.name),
        description: ValidString.create(props.description),
        price: Price.create(props.price),
        image: props.image ? ValidString.create(props.image) : null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      new UniqueEntityID(props.id)
    )
    return item
  }

  update(props: UpdateItemProps): void {
    const { name, description, price, image, categoryId } = props

    if (name !== undefined && name !== this.name) {
      this.name = name
    }

    if (description !== undefined && description !== this.description) {
      this.description = description
    }

    if (price !== undefined && price !== this.price) {
      this.price = price
    }

    if (image !== undefined && image !== this.image) {
      this.image = image
    }

    if (categoryId !== undefined && categoryId !== this.categoryId) {
      this.categoryId = categoryId
    }

    this.touch()
  }

  softDelete() {
    if (this.deletedAt) throw new Error('Item already deleted')
    this.props.deletedAt = new Date()
  }

  activate() {
    if (!this.deletedAt) throw new Error('Item not deleted')
    this.props.deletedAt = null
    this.touch()
  }
}
