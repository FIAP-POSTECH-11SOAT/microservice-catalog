import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const createItemBodySchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  categoryId: z.uuid(),
})
export class CreateItemBodySchema extends createZodDto(createItemBodySchema) {}
