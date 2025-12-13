import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const activeItemParamSchema = z.object({
  itemId: z.uuid(),
})
export class ActiveItemParamSchema extends createZodDto(activeItemParamSchema) {}
