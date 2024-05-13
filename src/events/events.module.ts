import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from "./schema/events.schema";
import { EventController } from "./events.controller";
import { EventService } from "./events.service";
import { EventsRepository } from "./events.repository";


@Module({
    imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
    controllers: [EventController],
    providers: [EventService, EventsRepository],
})
export class EventsModule {}