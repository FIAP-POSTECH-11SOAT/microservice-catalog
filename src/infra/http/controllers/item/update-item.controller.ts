import { applyDecorators, Body, Controller, HttpCode, Param, Patch, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateItemUseCase } from '@/application/item/use-cases/update-item.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { UpdateItemBodySchema, UpdateItemParamSchema, updateItemBodySchema, updateItemParamSchema } from './update-item.dto'

@Controller('items/:itemId')
@ApiTags('Items')
export class UpdateItemController {
  constructor(private readonly updateItemUseCase: UpdateItemUseCase) {}

  @Patch()
  @HttpCode(204)
  @UpdateItemController.swagger()
  @UsePipes(
    new ZodRequestValidationPipe({
      body: updateItemBodySchema,
      param: updateItemParamSchema,
    })
  )
  async handle(@Body() body: UpdateItemBodySchema, @Param() param: UpdateItemParamSchema) {
    try {
      await this.updateItemUseCase.execute({
        id: param.itemId,
        ...body,
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Update item',
        description: 'This endpoint allows you to update an item.',
      }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
