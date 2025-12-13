import { applyDecorators, Body, Controller, HttpCode, Post, UnprocessableEntityException, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateItemUseCase } from '@/application/item/use-cases/create-item.use-case'
import { ZodRequestValidationPipe } from '../../pipes/zod-request-validation-pipe'
import { ItemPresenter } from '../../presenters/item-presenter'
import { CreateItemBodySchema, createItemBodySchema } from './create-item.dto'

@Controller('/items')
@ApiTags('Items')
export class CreateItemController {
  constructor(private readonly createItemUseCase: CreateItemUseCase) {}

  @Post()
  @HttpCode(201)
  @CreateItemController.swagger()
  @UsePipes(new ZodRequestValidationPipe({ body: createItemBodySchema }))
  async handle(@Body() body: CreateItemBodySchema) {
    try {
      const item = await this.createItemUseCase.execute(body)
      return ItemPresenter.toHTTP(item)
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  private static swagger() {
    return applyDecorators(
      ApiOperation({
        summary: 'Create a new item',
        description: 'This endpoint creates a new item. The name of the item must be unique and category must exist.',
      }),
      ApiResponse({ status: 201, description: 'Created' }),
      ApiResponse({ status: 400, description: 'Bad Request' }),
      ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    )
  }
}
