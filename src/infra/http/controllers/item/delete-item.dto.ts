import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const deleteItemParamSchema = z.object({
  itemId: z.uuid(),
})
export class DeleteItemParamSchema extends createZodDto(deleteItemParamSchema) {}
