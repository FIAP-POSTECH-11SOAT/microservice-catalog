import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { cleanupOpenApiDoc } from 'nestjs-zod'
import { AppModule } from './app.module'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  })

  // SWAGGER
  const openAPIConfig = new DocumentBuilder()
    .setTitle('FIAP POS TECH - Restaurant Management System')
    .setDescription('Catalog Microsservice API documentation')
    .setVersion('1.0')
    .addTag('App', 'Endpoints related to application')
    .addTag('Categories', 'Endpoints managing categories')
    .addTag('Items', 'Manage product items and their details')
    .build()
  const openAPIDoc = SwaggerModule.createDocument(app, openAPIConfig)
  SwaggerModule.setup('api', app, cleanupOpenApiDoc(openAPIDoc))

  const configService = app.get(EnvService)
  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()
