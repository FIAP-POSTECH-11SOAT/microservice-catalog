import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CacheRepository } from './redis/redis.repository'
import { RedisService } from './redis/redis.service'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: CacheRepository,
      useClass: RedisService,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
