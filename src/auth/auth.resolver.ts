import { Resolver, Mutation, Args } from "@nestjs/graphql"
import { UseGuards, ConflictException } from "@nestjs/common"
import type { AuthService } from "./auth.service"
import type { UsersService } from "../users/users.service"
import type { RegisterInput, LoginInput, BiometricLoginInput, SetBiometricKeyInput } from "./dto/auth-input.dto"
import { AuthResponse } from "./dto/auth-response.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { CurrentUser } from "../common/decorators/current-user.decorator"


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput): Promise<AuthResponse> {
    const { email, password } = registerInput;
    
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    
    return this.authService.register(email, password);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.authService.validateUserByEmail(email, password);
    return this.authService.login(user);
  }

  @Mutation(() => AuthResponse)
  async biometricLogin(
    @Args('input') biometricLoginInput: BiometricLoginInput,
  ): Promise<AuthResponse> {
    const { biometricKey } = biometricLoginInput;
    const user = await this.authService.validateUserByBiometric(biometricKey);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthResponse)
  async setBiometricKey(
    @CurrentUser() user: any,
    @Args('input') setBiometricKeyInput: SetBiometricKeyInput,
  ): Promise<AuthResponse> {
    const { biometricKey } = setBiometricKeyInput

    // Check if biometric key is already in use
    const existingUser = await this.usersService.findByBiometricKey(biometricKey)
    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictException("Biometric key already in use")
    }

    return this.authService.setBiometricKey(user.id, biometricKey)
  }
}
