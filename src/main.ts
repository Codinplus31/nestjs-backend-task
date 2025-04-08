import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// Bootstrap function to initialize the NestJS application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(process.env.PORT || 3000);
  return app;
}

// For Vercel serverless deployment
let app: any;
let dbInitialized = false;

export default async (req: Request, res: Response) => {
  try {
    if (!app) {
      app = await bootstrap();

      // Initialize database on first request
      if (!dbInitialized) {
        const prisma = new PrismaClient();
        try {
          // Run SQL statements one at a time
          await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "User" (
            "id" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "biometricKey" TEXT,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "User_pkey" PRIMARY KEY ("id")
          );`;

          await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`;

          await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "User_biometricKey_key" ON "User"("biometricKey") WHERE "biometricKey" IS NOT NULL;`;

          console.log('Database connection established');
          dbInitialized = true;
        } catch (error) {
          console.error('Database initialization error:', error);
        } finally {
          await prisma.$disconnect();
        }
      }
    }
    return app.getHttpAdapter().getInstance()(req, res);
  } catch (error) {
    console.error('Request error:', error);
    res.status(500).send('Internal Server Error');
  }
};

// For local development
if (process.env.NODE_ENV !== "production") {
  bootstrap()
    .then((app) => {
      const port = process.env.PORT || 3000;
      app.listen(port);
      // app.getUrl().then((url) => console.log(`Application is running on: ${url}`));
    })
    .catch((error) => console.error('Bootstrap error:', error));
}
