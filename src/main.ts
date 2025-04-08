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
let app: any;
export default async (req: Request, res: Response) => {
  if (!app) {
    app = await bootstrap()
  }
  return app.getHttpAdapter().getInstance()(req, res)
}

// For local development
if (process.env.NODE_ENV !== "production") {
  bootstrap()
    .then((app) => {
    const port = process.env.PORT || 3000;
    app.listen(port);
  //   app.getUrl().then((url) => console.log(`Application is running on: ${url}`));
  });
}

