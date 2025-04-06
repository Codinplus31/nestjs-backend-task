import { Injectable, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Add connection pooling configuration for serverless environment
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // Recommended for serverless deployments
      log: ["error"],
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "test") {
      // Only allow this in test environment
      return Promise.all([this.user.deleteMany()])
    }
  }
}

