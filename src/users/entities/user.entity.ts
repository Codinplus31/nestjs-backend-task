import { ObjectType, Field, ID } from "@nestjs/graphql"

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @Field()
  email!: string

  // We don't expose the password in GraphQL responses

  @Field({ nullable: true })
  biometricKey?: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}
