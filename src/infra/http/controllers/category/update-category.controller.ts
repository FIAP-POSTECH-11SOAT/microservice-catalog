import { applyDecorators, Body, Controller, HttpCode, Param, Put, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateCategoryUseCase } from '@/application/category/use-cases/update-category.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { UpdateCategoryBodySchema, UpdateCategoryParamSchema, updateCategoryParamSchema } from './update-category.dto'

@Controller('/categories/:categoryId')
@ApiTags('Categories')
export class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

  @Put()
  @HttpCode(204)
  @UpdateCategoryController.swagger()
  @UsePipes(
    new ZodRequestValidationPipe({
      body: updateCategoryParamSchema,
      param: updateCategoryParamSchema,
    })
  )
  async handle(@Body() body: UpdateCategoryBodySchema, @Param() param: UpdateCategoryParamSchema) {
    try {
      await this.updateCategoryUseCase.execute({
        id: param.categoryId,
        name: body.name,
      })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Update category',
        description: 'This endpoint allows you to update an category.',
      }),
      ApiResponse({ status: 204, description: 'No Content' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
