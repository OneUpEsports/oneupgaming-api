import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user-inputs.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Friends } from 'src/friends/entities/friend.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    try {
      const isUser = await this.UserModel.findOne({
        email: createUserInput.email,
      });
      if (isUser) {
        throw new GraphQLError('User already exist');
      } else {
        createUserInput.password = await bcrypt
          .hash(createUserInput.password, 10)
          .then((r) => r);
        return await new this.UserModel(createUserInput).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async login({ password, email }) {
    try {
      const user = await this.UserModel.findOne({ email });
      return user && (await bcrypt.compare(password, user.password))
        ? await this.jwtService.signAsync({ email, _id: user._id })
        : new GraphQLError('wrong password/email');
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      return await this.UserModel.find().exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(_id, updateUserInput: UpdateUserInput) {
    try {
      return await this.UserModel.findByIdAndUpdate(_id, updateUserInput, {
        new: true,
      }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async updatePassword(_id, currPass, newPass) {
    try {
      const User = await this.UserModel.findById(_id).exec();
      if (await bcrypt.compare(currPass, User.password)) {
        User.password = await bcrypt.hash(newPass, 10);
        return await new this.UserModel(User).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      const TEST = await this.UserModel.findById(_id, null , {lean: true} ).exec();
     console.log(await TEST)
     return TEST
    } catch (err) {
      console.error(err);
    }
  }

  async searchUser(username: string){
    try {
      const name = username
      const User = await this.UserModel.find({username: {$regex: name, $options: 'i'}}).lean().exec()
      console.log(await User)
      if(!User) throw new  Error("No Users were found")
      return User
    } catch (err){
      console.error(err)
    }
  }

  async remove(_id: string) {
    try {
      return await this.UserModel.findByIdAndRemove(_id);
    } catch (err) {
      console.error(err);
    }
  }
}
