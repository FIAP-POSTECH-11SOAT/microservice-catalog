import { applyDecorators, Controller, Get, HttpCode, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetDeletedItemsUseCase } from '@/application/item/use-cases/get-deleted-items.use-case'
import { ItemPresenter } from '../../presenters/item-presenter'
import { GetDeletedItemsResponseSchema } from './get-deleted-items.dto'

@Controller('items/status/deleted')
@ApiTags('Items')
export class GetDeletedItemsController {
  constructor(private getDeletedItemsUseCase: GetDeletedItemsUseCase) {}

  @Get()
  @HttpCode(200)
  @GetDeletedItemsController.swagger()
  async handle() {
    try {
      const result = await this.getDeletedItemsUseCase.execute()
      const items = result.map(ItemPresenter.toHTTP)
      return {
        items,
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Get deleted items',
        description: 'This endpoint allows you to get deleted items. The categories are returned in an array.',
      }),
      ApiResponse({ status: 200, description: 'OK', type: GetDeletedItemsResponseSchema }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
