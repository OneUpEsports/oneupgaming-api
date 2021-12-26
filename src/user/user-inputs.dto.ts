import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Friends } from 'src/friends/entities/friend.entity';

@InputType()
export class CreateUserInput {
  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  password: string;

  @Field()
  createdAt: string = new Date().toISOString();

}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password', 'createdAt'] as const),
) {}
