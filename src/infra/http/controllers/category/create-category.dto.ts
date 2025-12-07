import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const createCategoryBodySchema = z.object({
  name: z.string().min(1),
})
export class CreateCategoryBodySchema extends createZodDto(createCategoryBodySchema) {}
