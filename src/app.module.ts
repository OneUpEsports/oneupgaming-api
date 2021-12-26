import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooResolver } from './foo/foo.resolver';
import { UserModule } from './user/user.module';
import { TeamsModule } from './teams/teams.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    TeamsModule,
    FriendsModule
  ],
  controllers: [AppController],
  providers: [AppService, FooResolver, JwtStrategy],
})
export class AppModule {}
