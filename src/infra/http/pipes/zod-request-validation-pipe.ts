import { type ArgumentMetadata, BadRequestException, Injectable, type PipeTransform } from '@nestjs/common'
import { ZodError, type ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error'

interface MultiZodSchema {
  body?: ZodType
  param?: ZodType
  query?: ZodType
}

@Injectable()
export class ZodRequestValidationPipe implements PipeTransform {
  constructor(private schemas: MultiZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = this.schemas[metadata.type as keyof MultiZodSchema]
    if (!schema) return value
    try {
      return schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
      })
    }
  }
}
