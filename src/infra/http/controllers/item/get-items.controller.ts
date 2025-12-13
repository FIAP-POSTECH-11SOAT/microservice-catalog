import { applyDecorators, Controller, Get, HttpCode, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetItemsUseCase } from '@/application/item/use-cases/get-items.use-case'
import { ItemPresenter } from '../../presenters/item-presenter'
import { GetItemsResponseSchema } from './get-items.dto'

@Controller('items')
@ApiTags('Items')
export class GetItemsController {
  constructor(private getItemsUseCase: GetItemsUseCase) {}

  @Get()
  @HttpCode(200)
  @GetItemsController.swagger()
  async handle() {
    try {
      const result = await this.getItemsUseCase.execute()
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
        summary: 'Get items',
        description: 'This endpoint allows you to get items. The categories are returned in an array.',
      }),
      ApiResponse({ status: 200, description: 'OK', type: GetItemsResponseSchema }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
