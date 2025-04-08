import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo"
import { ConfigModule } from "@nestjs/config"
import { join } from "path"

import { PrismaModule } from "./prisma/prisma.module"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
//import { Request } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      context: ({ req }: { req: Request }) => ({ req }),

    }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

