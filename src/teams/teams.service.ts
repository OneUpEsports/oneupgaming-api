import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team, TeamDocument } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Team.name) private TeamModel: Model<TeamDocument>,
  ){

  }
  async createTeam(createTeamInput: CreateTeamInput) {
    try {
      const isTeam = await this.TeamModel.findOne({
        name: createTeamInput.name,
      }).exec();
      if (isTeam) {
        throw new GraphQLError('Team already exists');
      } else {
        const {description, name, owner_id} = createTeamInput;
        const owner = await this.userService.findOne(owner_id)
        console.log(owner)
        return await new this.TeamModel({name, description, owner}).save();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      return await this.TeamModel.find().populate({path: "owner"}).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(_id: string) {
    try {
      return await this.TeamModel.findById(_id).populate({path: "owner"}).exec();
    } catch (err) {
      console.error(err);
    }
  }
  async update(_id: string, updateTeamInput: UpdateTeamInput) {
    try {
      return await this.TeamModel.findByIdAndUpdate(_id, updateTeamInput, {
        new: true,
      }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async remove(_id: string) {
    try {
    return await this.TeamModel.findByIdAndRemove(_id);
  } catch (err) {
    console.error(err);
  }
  }
}
