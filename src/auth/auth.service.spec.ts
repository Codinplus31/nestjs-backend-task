import { Test,  TestingModule } from "@nestjs/testing"
import { JwtService } from "@nestjs/jwt"
import { UnauthorizedException } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UsersService } from "../users/users.service"
import  { User } from "@prisma/client"

describe("AuthService", () => {
  let authService: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  const mockUser: User = {
    id: "test-id",
    email: "test@example.com",
    password: "hashed-password",
    biometricKey: "test-biometric-key",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findByBiometricKey: jest.fn(),
            validatePassword: jest.fn(),
            create: jest.fn(),
            setBiometricKey: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => "test-token"),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it("should be defined", () => {
    expect(authService).toBeDefined()
  })

  describe("validateUserByEmail", () => {
    it("should return a user when credentials are valid", async () => {
      jest.spyOn(usersService, "findByEmail").mockResolvedValue(mockUser)
      jest.spyOn(usersService, "validatePassword").mockResolvedValue(true)

      const result = await authService.validateUserByEmail("test@example.com", "password")

      expect(result).toEqual(mockUser)
      expect(usersService.findByEmail).toHaveBeenCalledWith("test@example.com")
      expect(usersService.validatePassword).toHaveBeenCalledWith(mockUser, "password")
    })

    it("should throw UnauthorizedException when user is not found", async () => {
      jest.spyOn(usersService, "findByEmail").mockResolvedValue(null)

      await expect(authService.validateUserByEmail("nonexistent@example.com", "password")).rejects.toThrow(
        UnauthorizedException,
      )
    })

    it("should throw UnauthorizedException when password is invalid", async () => {
      jest.spyOn(usersService, "findByEmail").mockResolvedValue(mockUser)
      jest.spyOn(usersService, "validatePassword").mockResolvedValue(false)

      await expect(authService.validateUserByEmail("test@example.com", "wrong-password")).rejects.toThrow(
        UnauthorizedException,
      )
    })
  })

  describe("validateUserByBiometric", () => {
    it("should return a user when biometric key is valid", async () => {
      jest.spyOn(usersService, "findByBiometricKey").mockResolvedValue(mockUser)

      const result = await authService.validateUserByBiometric("test-biometric-key")

      expect(result).toEqual(mockUser)
      expect(usersService.findByBiometricKey).toHaveBeenCalledWith("test-biometric-key")
    })

    it("should throw UnauthorizedException when biometric key is invalid", async () => {
      jest.spyOn(usersService, "findByBiometricKey").mockResolvedValue(null)

      await expect(authService.validateUserByBiometric("invalid-key")).rejects.toThrow(UnauthorizedException)
    })
  })

  describe("login", () => {
    it("should return access token and user data", async () => {
      jest.spyOn(jwtService, "sign").mockReturnValue("test-token")

      const result = await authService.login(mockUser)

      expect(result).toEqual({
        accessToken: "test-token",
        user: {
          id: mockUser.id,
          email: mockUser.email,
          biometricKey: mockUser.biometricKey,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
      })
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      })
    })
  })

  describe("register", () => {
    it("should create a new user and return access token", async () => {
      jest.spyOn(usersService, "create").mockResolvedValue(mockUser)
      jest.spyOn(authService, "login").mockResolvedValue({
        accessToken: "test-token",
        user: mockUser,
      })

      const result = await authService.register("test@example.com", "password")

      expect(result).toEqual({
        accessToken: "test-token",
        user: mockUser,
      })
      expect(usersService.create).toHaveBeenCalledWith("test@example.com", "password")
    })
  })

  describe("setBiometricKey", () => {
    it("should update user biometric key and return access token", async () => {
      jest.spyOn(usersService, "setBiometricKey").mockResolvedValue(mockUser)
      jest.spyOn(authService, "login").mockResolvedValue({
        accessToken: "test-token",
        user: mockUser,
      })

      const result = await authService.setBiometricKey("test-id", "new-biometric-key")

      expect(result).toEqual({
        accessToken: "test-token",
        user: mockUser,
      })
      expect(usersService.setBiometricKey).toHaveBeenCalledWith("test-id", "new-biometric-key")
    })
  })
})

