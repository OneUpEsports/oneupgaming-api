import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose'
import { Friends } from '../friends/entities/friend.entity';

enum Roles {
  Admin = 'Admin',
  Basic = 'Basic',
  Premium = 'Premium',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'Roles for Admin creating projects and users',
});

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id!: Types.ObjectId;

  @Field(() => String, {nullable: true})
  @Prop()
  firstName!: string;

  @Field(() => String, {nullable: true})
  @Prop()
  username: string;

  @Field(() => String, {nullable: true})
  @Prop()
  lastName!: string;

  @Field(() => String, {nullable: true})
  @Prop()
  password!: string;

  @Field(() => String, {nullable: true})
  @Prop()
  email!: string;

  @Field(() => String, {nullable: true})
  @Prop()
  createdAt: string;

  @Field(() => Roles, { defaultValue: Roles.Basic, nullable: true })
  @Prop()
  roles?: string;

  @Field(() => [Friends] ,{nullable: true, defaultValue: undefined})
  @Prop({type: Types.ObjectId, ref: Friends.name})
  friends: Friends[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserFriendslist extends User {
  @Field(() => Number, {nullable: true})
  friendsStatus?:  number;
}