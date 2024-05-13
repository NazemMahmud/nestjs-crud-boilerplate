import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

import appConfig from "./config/app.config";
import mongooseConfig from "./config/mongoose.config";


@Module({
  imports: [
      ConfigModule.forRoot(({
        load: [appConfig]
      })),
      MongooseModule.forRootAsync({
          ...mongooseConfig,
      }),
      EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}