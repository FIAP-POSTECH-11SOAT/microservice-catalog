import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const getCategoriesResponseSchema = z.object({
  categories: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      createdAt: z.iso.datetime(),
      updatedAt: z.iso.datetime(),
      deletedAt: z.iso.datetime(),
    })
  ),
})
export class GetCategoriesResponseSchema extends createZodDto(getCategoriesResponseSchema) {}
