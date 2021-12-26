import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Types } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './teams.guard';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamsService.createTeam(createTeamInput);
  }

  @Query(() => [Team], { name: 'findAllTeams' })
  findAllTeams() {
    return this.teamsService.findAll();
  }

  @Query(() => Team, { name: 'findTeam' })
  findOneTeam(@Args('_id', { type: () => String }) _id: string) {
    return this.teamsService.findOne(_id);
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamsService.update(updateTeamInput._id, updateTeamInput);
  }

  @Mutation(() => Team)
  @UseGuards(GqlAuthGuard)
  removeTeam(@Args('id', { type: () => Int }) id: string) {
    return this.teamsService.remove(id);
  }

  
}
