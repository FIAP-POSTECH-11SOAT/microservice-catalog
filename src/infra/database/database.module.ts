import { Module } from '@nestjs/common'
import { CategoriesRepository } from '@/application/category/repositories/categories.repository'
import { ItemsRepository } from '@/application/item/repositories/items.repository'
import { EnvModule } from '../env/env.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories.repository'
import { PrismaItemsRepository } from './prisma/repositories/prisma-items.repository'

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: ItemsRepository,
      useClass: PrismaItemsRepository,
    },
  ],
  exports: [PrismaService, CategoriesRepository, ItemsRepository],
})
export class DatabaseModule {}
