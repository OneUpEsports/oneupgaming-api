import { InputType, Int, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { User } from 'src/user/user.entity';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  owner_id: Types.ObjectId;

  @Field()
  name: string;
  
  @Field()
  description: string
}
