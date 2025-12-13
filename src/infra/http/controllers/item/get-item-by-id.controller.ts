import { applyDecorators, Controller, Get, HttpCode, Param, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetItemByIdUseCase } from '@/application/item/use-cases/get-item-by-id.use-case'
import { ItemPresenter } from '../../presenters/item-presenter'
import { GetItemByIdParamSchema, GetItemByIdResponseSchema } from './get-item-by-id.dto'

@Controller('items/:itemId')
@ApiTags('Items')
export class GetItemByIdController {
  constructor(private readonly getItemByIdUseCase: GetItemByIdUseCase) {}

  @Get()
  @HttpCode(200)
  @GetItemByIdController.swagger()
  async getItemById(@Param() param: GetItemByIdParamSchema) {
    try {
      const item = await this.getItemByIdUseCase.execute(param.itemId)
      return ItemPresenter.toHTTP(item)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Get item by ID',
        description: 'This endpoint allows you to get an item by id.',
      }),
      ApiResponse({ status: 200, description: 'OK', type: GetItemByIdResponseSchema }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
