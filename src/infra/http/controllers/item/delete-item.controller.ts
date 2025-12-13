import { applyDecorators, Controller, Delete, HttpCode, Param, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DeleteItemUseCase } from '@/application/item/use-cases/delete-item.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { DeleteItemParamSchema, deleteItemParamSchema } from './delete-item.dto'

@Controller('items/:itemId')
@ApiTags('Items')
export class DeleteItemController {
  constructor(private readonly deleteItemUseCase: DeleteItemUseCase) {}

  @Delete()
  @HttpCode(200)
  @DeleteItemController.swagger()
  @UsePipes(new ZodRequestValidationPipe({ param: deleteItemParamSchema }))
  async handle(@Param() param: DeleteItemParamSchema) {
    try {
      await this.deleteItemUseCase.execute(param.itemId)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Delete item',
        description: 'This endpoint allows you to delete an item.',
      }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
