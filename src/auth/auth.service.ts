import { Injectable, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { UsersService } from "../users/users.service"
import type { JwtPayload } from "./interfaces/jwt-payload.interface"
import type { AuthResponse } from "./dto/auth-response.dto"
import type { User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await this.usersService.validatePassword(user, password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return user
  }

  async validateUserByBiometric(biometricKey: string): Promise<User> {
    const user = await this.usersService.findByBiometricKey(biometricKey)

    if (!user) {
      throw new UnauthorizedException("Invalid biometric key")
    }

    return user
  }

  async login(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    }

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        biometricKey: user.biometricKey,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    const user = await this.usersService.create(email, password)

    return this.login(user)
  }

  async setBiometricKey(userId: string, biometricKey: string): Promise<AuthResponse> {
    const user = await this.usersService.setBiometricKey(userId, biometricKey)

    return this.login(user)
  }
}

