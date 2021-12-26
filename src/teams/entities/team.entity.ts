import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Types } from 'mongoose';
import { User } from 'src/user/user.entity';

@ObjectType()
@Schema()
export class Team {

  @Field(() => String)
  _id: Types.ObjectId;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner!: User;

  @Field()
  @Prop()
  name: string;
  
  @Field({nullable: true})
  @Prop()
  description: string
  
  @Field({nullable: true})
  @Prop()
  image: string


}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);