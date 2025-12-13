import { applyDecorators, Controller, HttpCode, Param, Patch, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ActivateItemUseCase } from '@/application/item/use-cases/activate-item.use-case'
import { ActiveItemParamSchema } from './active-item.dto'

@Controller('items/:itemId/activate')
@ApiTags('Items')
export class ActivateItemController {
  constructor(private readonly activateItemUseCase: ActivateItemUseCase) {}

  @Patch()
  @HttpCode(204)
  @ActivateItemController.swagger()
  async handle(@Param() param: ActiveItemParamSchema) {
    try {
      await this.activateItemUseCase.execute(param.itemId)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Activate item',
        description: 'This endpoint allows you to activate an item.',
      }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
