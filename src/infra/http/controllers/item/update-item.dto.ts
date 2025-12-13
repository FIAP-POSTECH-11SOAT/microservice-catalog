import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const updateItemParamSchema = z.object({
  itemId: z.uuid(),
})
export class UpdateItemParamSchema extends createZodDto(updateItemParamSchema) {}

export const updateItemBodySchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
  categoryId: z.string().optional(),
})
export class UpdateItemBodySchema extends createZodDto(updateItemBodySchema) {}
