import { Module } from '@nestjs/common'
import { CreateCategoryUseCase } from '@/application/category/use-cases/create-category.use-case'
import { DeleteCategoryUseCase } from '@/application/category/use-cases/delete-category.use-case'
import { GetCategoriesUseCase } from '@/application/category/use-cases/get-categories.use-case'
import { UpdateCategoryUseCase } from '@/application/category/use-cases/update-category.use-case'
import { ActivateItemUseCase } from '@/application/item/use-cases/activate-item.use-case'
import { CreateItemUseCase } from '@/application/item/use-cases/create-item.use-case'
import { DeleteItemUseCase } from '@/application/item/use-cases/delete-item.use-case'
import { GetDeletedItemsUseCase } from '@/application/item/use-cases/get-deleted-items.use-case'
import { GetItemByCategoryIdUseCase } from '@/application/item/use-cases/get-item-by-category-id.use-case'
import { GetItemByIdUseCase } from '@/application/item/use-cases/get-item-by-id.use-case'
import { GetItemsUseCase } from '@/application/item/use-cases/get-items.use-case'
import { UpdateItemUseCase } from '@/application/item/use-cases/update-item.use-case'
import { CacheModule } from '../cache/cache.module'
import { DatabaseModule } from '../database/database.module'
import { HealthCheckController } from './controllers/app/health-check.controller'
import { CreateCategoryController } from './controllers/category/create-category.controller'
import { DeleteCategoryController } from './controllers/category/delete-category.controller'
import { GetCategoriesController } from './controllers/category/get-categories.controller'
import { UpdateCategoryController } from './controllers/category/update-category.controller'
import { ActivateItemController } from './controllers/item/activate-item.controller'
import { CreateItemController } from './controllers/item/create-item.controller'
import { DeleteItemController } from './controllers/item/delete-item.controller'
import { GetDeletedItemsController } from './controllers/item/get-deleted-items.controller'
import { GetItemByIdController } from './controllers/item/get-item-by-id.controller'
import { GetItemsController } from './controllers/item/get-items.controller'
import { GetItemByCategoryIdController } from './controllers/item/get-items-by-category-id.controller'
import { UpdateItemController } from './controllers/item/update-item.controller'

@Module({
  imports: [DatabaseModule, CacheModule],
  controllers: [
    // ===== App
    HealthCheckController,
    // ===== Category
    CreateCategoryController,
    GetCategoriesController,
    UpdateCategoryController,
    DeleteCategoryController,
    // ===== Item
    CreateItemController,
    DeleteItemController,
    UpdateItemController,
    ActivateItemController,
    GetDeletedItemsController,
    GetItemByIdController,
    GetItemsController,
    GetItemByCategoryIdController,
  ],
  providers: [
    // ===== Category
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    // ===== Item
    CreateItemUseCase,
    DeleteItemUseCase,
    UpdateItemUseCase,
    ActivateItemUseCase,
    GetDeletedItemsUseCase,
    GetItemByIdUseCase,
    GetItemsUseCase,
    GetItemByCategoryIdUseCase,
  ],
})
export class HttpModule {}
