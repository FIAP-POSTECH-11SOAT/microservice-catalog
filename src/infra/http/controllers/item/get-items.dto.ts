import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const getItemsResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      price: z.number(),
      description: z.string(),
      image: z.string().nullable(),
      categoryId: z.uuid(),
      createdAt: z.iso.datetime(),
      updatedAt: z.iso.datetime(),
      deletedAt: z.iso.datetime(),
    })
  ),
})
export class GetItemsResponseSchema extends createZodDto(getItemsResponseSchema) {}
