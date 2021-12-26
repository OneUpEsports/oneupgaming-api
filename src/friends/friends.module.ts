import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsResolver } from './friends.resolver';
import { UserModule } from 'src/user/user.module';
import { Friends, FriendsSchema } from './entities/friend.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Friends.name, schema: FriendsSchema }]),
  ],
  providers: [FriendsResolver, FriendsService],
  exports: [FriendsService]
})
export class FriendsModule {}
