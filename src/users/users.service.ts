import { Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { User } from "@prisma/client"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findByBiometricKey(biometricKey: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { biometricKey },
    })
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password)

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  }

  async setBiometricKey(userId: string, biometricKey: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { biometricKey },
    })
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }
}
