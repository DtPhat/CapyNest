import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { StoriesModule } from './stories/stories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi'
import { JwtModule } from '@nestjs/jwt';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      })
    }),
    DatabaseModule,
    StoriesModule,
    AuthModule,
    LoggerModule,
    UsersModule,
    VideosModule,
  ],
  // controllers: [MainController],
  // providers: [MainService],
})
export class MainModule { }
