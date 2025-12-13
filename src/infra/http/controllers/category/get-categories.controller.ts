import { applyDecorators, Controller, Get, HttpCode, UnprocessableEntityException } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetCategoriesUseCase } from '@/application/category/use-cases/get-categories.use-case'
import { CategoryPresenter } from '../../presenters/category-presenter'
import { GetCategoriesResponseSchema } from './get-categories.dto'

@Controller('/categories')
@ApiTags('Categories')
export class GetCategoriesController {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {}

  @Get()
  @HttpCode(200)
  @GetCategoriesController.swagger()
  async handle() {
    try {
      const result = await this.getCategoriesUseCase.execute()
      const categories = result.map(CategoryPresenter.toHTTP)
      return {
        categories,
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Get all categories',
        description: 'This endpoint allows you to get all categories. The categories are returned in an array.',
      }),
      ApiResponse({ status: 200, description: 'OK', type: GetCategoriesResponseSchema })
    )
  }
}
