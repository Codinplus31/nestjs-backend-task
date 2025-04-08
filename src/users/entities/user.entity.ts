import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  biometricKey?: string; // Allow null values

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
