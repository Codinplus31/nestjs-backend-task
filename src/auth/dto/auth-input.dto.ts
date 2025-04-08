import { InputType, Field } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email!: string

  @Field()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password!: string
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email!: string

  @Field()
  @IsNotEmpty({ message: "Password is required" })
  password!: string
}

@InputType()
export class BiometricLoginInput {
  @Field()
  @IsNotEmpty({ message: "Biometric key is required" })
  biometricKey!: string
}

@InputType()
export class SetBiometricKeyInput {
  @Field()
  @IsNotEmpty({ message: "Biometric key is required" })
  biometricKey!: string
}
