import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const updateCategoryParamSchema = z.object({
  categoryId: z.uuid(),
})
export class UpdateCategoryParamSchema extends createZodDto(updateCategoryParamSchema) {}

export const updateCategoryBodySchema = z.object({
  name: z.string().min(1),
})
export class UpdateCategoryBodySchema extends createZodDto(updateCategoryBodySchema) {}
