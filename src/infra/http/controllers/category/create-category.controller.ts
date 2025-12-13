import { applyDecorators, Body, Controller, HttpCode, Post, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCategoryUseCase } from '@/application/category/use-cases/create-category.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { CreateCategoryBodySchema, createCategoryBodySchema } from './create-category.dto'

@Controller('/categories')
@ApiTags('Categories')
export class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategoryUseCase) {}

  @Post()
  @HttpCode(201)
  @CreateCategoryController.swagger()
  @UsePipes(new ZodRequestValidationPipe({ body: createCategoryBodySchema }))
  async handle(@Body() body: CreateCategoryBodySchema) {
    try {
      await this.createCategory.execute({ name: body.name })
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Create new category',
        description: 'This endpoint allows you to create a category.',
      }),
      ApiResponse({ status: 201, description: 'Created' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
