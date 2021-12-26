import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/user.entity';
import { UpdateFriendInput } from './dto/update-friend.input';
import { Friends, FriendsDocument } from './entities/friend.entity';
import * as mongoose from 'mongoose'
import { ObjectId } from 'bson';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private FriendsModel: Model<FriendsDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>
  ){

  }
  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendInput: UpdateFriendInput) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }

  async acceptFriend(requester: Types.ObjectId, recipient: Types.ObjectId){
    try {
      const userA = await this.FriendsModel.findOneAndUpdate(
        { requester: requester, recipient: recipient },
        { $set: { status: 3 }}
      )
      const userB = await this.FriendsModel.findOneAndUpdate(
          { recipient: requester, requester: recipient },
          { $set: { status: 3 }}
      )
      return [userA, userB]
    } catch(err) {
      console.error(err)
    }

  }

  async addFriend(requester: Types.ObjectId, recipient: Types.ObjectId) {
    try {
      const req = await this.UserModel.findById(requester).exec()

      const rec = await this.UserModel.findById(recipient).exec()
      const docA = await this.FriendsModel.findOneAndUpdate(
        { requester: req, recipient: rec },
        { $set: { status: 1 }},
        { upsert: true, new: true }
      )
      const docB = await this.FriendsModel.findOneAndUpdate(
          { recipient: req, requester: rec },
          { $set: { status: 2 }},
          { upsert: true, new: true }
      )
      const updateUserA = await this.UserModel.findOneAndUpdate(
          { _id: req },
          { $push: { friends: docA._id }}
      )
      const updateUserB = await this.UserModel.findOneAndUpdate(
          { _id: rec },
          { $push: { friends: docB._id }}
      )
      return [docA, docB, updateUserA, updateUserB]
    } catch(err) {
      console.error(err)
    }

  }
  
  async rejectFriend(requester: Types.ObjectId, recipient: Types.ObjectId){
    const docA = await this.FriendsModel.findOneAndRemove(
      { requester: requester, recipient: recipient }
    )
    const docB = await this.FriendsModel.findOneAndRemove(
        { recipient: requester, requester: recipient }
    )
    const updateUserA = await this.UserModel.findOneAndUpdate(
        { _id: requester },
        { $pull: { friends: docA._id }}
    )
    const updateUserB = await this.UserModel.findOneAndUpdate(
        { _id: recipient },
        { $pull: { friends: docB._id }}
    )
    return [docA, docB, updateUserA, updateUserB] 
  }

  async getFriends(_id: string){
    const friends = await this.UserModel.aggregate([
      { "$lookup": {
        "from": this.FriendsModel.collection.name,
        "let": { "friends": "$friends" },
        "pipeline": [
          { "$match": {
            "recipient": new Types.ObjectId("61bcc8efed89f97ed14cb9bc"),
            "$expr": { "$in": [ "$_id", "$$friends" ] }
          }},
          { "$project": { "status": 1 } }
        ],
        "as": "friends"
      }},
      { "$addFields": {
        "friendsStatus": {
          "$ifNull": [ { "$min": "$friends.status" }, 0 ]
        }
      }}
    ]).exec()
    const res = await friends
    res.forEach(e => console.log(e))
  return friends
  }
}
