import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/events.schema';
import { UpdateEventDto } from "./dtos/update-event.dto";
import { EventsRepository } from "./events.repository";
import {sprintf} from "../utils/helpers";
import {NOT_FOUND} from "../utils/constants";

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<Event>,
        private readonly eventRepo: EventsRepository,
    ) {}

    async findById(id: string): Promise<Event> {
        return this.eventModel.findById(id, {deleted_at: {$eq: null}}).exec();
    }

    async update(id: string, eventData: UpdateEventDto): Promise<any> {
        const isExist = await this.eventRepo.isEventExists(id);
        if (!isExist) {
            throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
        }

        return this.eventRepo.update(id, eventData);
    }
}