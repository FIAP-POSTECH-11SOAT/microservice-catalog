import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const getItemByIdParamSchema = z.object({
  itemId: z.uuid(),
})
export class GetItemByIdParamSchema extends createZodDto(getItemByIdParamSchema) {}

const getItemByIdResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime(),
})
export class GetItemByIdResponseSchema extends createZodDto(getItemByIdResponseSchema) {}
