import { applyDecorators, Controller, Get, HttpCode, Param, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetItemByCategoryIdUseCase } from '@/application/item/use-cases/get-item-by-category-id.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { ItemPresenter } from '../../presenters/item-presenter'
import {
  GetItemsByCategoryIdParamSchema,
  GetItemsByCategoryIdResponseSchema,
  getItemsByCategoryIdParamSchema,
} from './get-items-by-category-id.dto'

@Controller('items/categories/:categoryId')
@ApiTags('Items')
export class GetItemByCategoryIdController {
  constructor(private getItemByCategoryIdUseCase: GetItemByCategoryIdUseCase) {}

  @Get()
  @HttpCode(200)
  @GetItemByCategoryIdController.swagger()
  @UsePipes(new ZodRequestValidationPipe({ param: getItemsByCategoryIdParamSchema }))
  async handle(@Param() param: GetItemsByCategoryIdParamSchema) {
    try {
      const result = await this.getItemByCategoryIdUseCase.execute(param.categoryId)
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
        summary: 'Get items by category',
        description: 'This endpoint allows you to get items by categoryId. The categories are returned in an array.',
      }),
      ApiResponse({ status: 200, description: 'OK', type: GetItemsByCategoryIdResponseSchema }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
