import { addFriendInput } from './add-friend.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFriendInput extends PartialType(addFriendInput) {
  @Field(() => Int)
  id: number;
}
