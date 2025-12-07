import { Module } from '@nestjs/common'
import { CreateCategoryUseCase } from '@/application/category/use-cases/create-category.use-case'
import { DeleteCategoryUseCase } from '@/application/category/use-cases/delete-category.use-case'
import { GetCategoriesUseCase } from '@/application/category/use-cases/get-categories.use-case'
import { UpdateCategoryUseCase } from '@/application/category/use-cases/update-category.use-case'
import { DatabaseModule } from '../database/database.module'
import { HealthCheckController } from './controllers/app/health-check.controller'
import { CreateCategoryController } from './controllers/category/create-category.controller'
import { DeleteCategoryController } from './controllers/category/delete-category.controller'
import { GetCategoriesController } from './controllers/category/get-categories.controller'
import { UpdateCategoryController } from './controllers/category/update-category.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    // ===== App
    HealthCheckController,
    // ===== Category
    CreateCategoryController,
    GetCategoriesController,
    UpdateCategoryController,
    DeleteCategoryController,
  ],
  providers: [
    // ===== Category
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class HttpModule {}
