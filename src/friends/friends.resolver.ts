import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { Friends } from './entities/friend.entity';
import { addFriendInput } from './dto/add-friend.input';
import { acceptFriendInput } from './dto/accept-friend.dto';
import { GqlAuthGuard } from 'src/strategies/guards/gql.guard';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { User, UserFriendslist } from 'src/user/user.entity';

@Resolver(() => Friends)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation(() => [Friends], { name: 'acceptFriend'})
  @UseGuards(GqlAuthGuard)
  async acceptFriend(@Args('acceptFriendInput') acceptFriendInput: acceptFriendInput){
      return await this.friendsService.acceptFriend(acceptFriendInput.requester, acceptFriendInput.recipient)
  }

  @Mutation(() => Friends, { name: 'addFriend' })
  @UseGuards(GqlAuthGuard)
  async addFriend(@Args('addFriendInput') addFriendInput: addFriendInput) {
      return await this.friendsService.addFriend(addFriendInput.requester, addFriendInput.recipient)
  }

  @Mutation(() => [Friends], { name: 'rejectFriend'})
  @UseGuards(GqlAuthGuard)
  async rejectFriend(@Args('addFriendInput') addFriendInput: addFriendInput){
      return await this.friendsService.rejectFriend(addFriendInput.requester, addFriendInput.recipient)
  }
  

  @Query(() => [UserFriendslist], { name: 'getFriends'})
  @UseGuards(GqlAuthGuard)
  async getFriends(@Args('_id', { type: () => String }) _id: string) {
      return await this.friendsService.getFriends(_id)
  }
}

