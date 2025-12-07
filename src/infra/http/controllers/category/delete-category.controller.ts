import { applyDecorators, Controller, Delete, HttpCode, Param, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DeleteCategoryUseCase } from '@/application/category/use-cases/delete-category.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { DeleteCategoryParamSchema, deleteCategoryParamSchema } from './delete-category.dto'

@Controller('/categories/:categoryId')
@ApiTags('Categories')
export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete()
  @HttpCode(200)
  @DeleteCategoryController.swagger()
  @UsePipes(new ZodRequestValidationPipe({ param: deleteCategoryParamSchema }))
  async handle(@Param() param: DeleteCategoryParamSchema) {
    try {
      await this.deleteCategoryUseCase.execute(param.categoryId)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Delete category',
        description: 'This endpoint allows you to delete an category.',
      }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
