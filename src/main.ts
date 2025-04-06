import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  return app
}

// For Vercel serverless deployment
let app
export default async (req, res) => {
  if (!app) {
    app = await bootstrap()
  }
  return app.getHttpAdapter().getInstance()(req, res)
}

// For local development
if (process.env.NODE_ENV !== "production") {
  bootstrap().then((app) => {
    app.listen(3000)
    app.getUrl().then((url) => console.log(`Application is running on: ${url}`))
  })
}

