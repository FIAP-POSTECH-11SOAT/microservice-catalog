import { Module } from '@nestjs/common'
import { HealthCheckController } from './app/health-check.controller'

@Module({
  controllers: [HealthCheckController],
})
export class HttpModule {}
