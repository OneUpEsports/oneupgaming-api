import { Field, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/user.entity";

enum status {
    AddFriend = 0,
    Requested = 1,
    Pending = 2,
    Accepted = 3
}

registerEnumType(status, {
    name: 'status',
    description: 'friendship states'
});

@ObjectType()
@Schema({timestamps: true})
export class Friends {
    @Field(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    requester: User;

    @Field(() => User)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    recipient: User

    @Field(() => status, { defaultValue: status.AddFriend, nullable: true })
    @Prop( {nullable: true})
    status: number;
}

export type FriendsDocument = Friends & Document
export const FriendsSchema = SchemaFactory.createForClass(Friends)