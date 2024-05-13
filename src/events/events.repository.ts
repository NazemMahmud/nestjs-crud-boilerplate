import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/events.schema';
import { CreateEventDto } from "./dtos/create-event.dto";
import { paginateParams } from "./dtos/paginate-event.dto";
import { sprintf } from "../utils/helpers";
import { NOT_FOUND } from "../utils/constants";
import {UpdateEventDto} from "./dtos/update-event.dto";


@Injectable()
export class EventsRepository {
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

    async create(event: CreateEventDto): Promise<Event> {
        const newEvent = new this.eventModel(event);
        return await newEvent.save();
    }

    async findAll({ nextCursor, prevCursor, limit, orderBy, sortBy, sortField}: paginateParams) {
        // todo: LATER move code to service
        const query = { deleted_at: null };
        let sortDirection: any = orderBy === 'asc' ? 1 : -1;

        if (nextCursor) {
            query[sortBy] = orderBy === 'asc' ? { $gt: nextCursor } : { $lt: nextCursor };
        }

        if (prevCursor) {
            query[sortBy] = orderBy === 'asc' ? { $lt: prevCursor } : { $gt: prevCursor };
            sortDirection = orderBy === 'asc' ? -1 : 1;
        }

        /**
         * NOTE: when use variable in sort(), use like:
         * sort({ [sortField]: sortDirection }),  OR,
         * sort(`${sortField}: ${sortDirection}`)
         */
        const events = await this.eventModel
            .find(query)
            .select('name address startDate endDate place mapAddress')
            .sort({ [sortField]: sortDirection })
            .limit(limit+1)
            .exec();

        let nextCursorValue = null;
        let previousCursorValue = null;

        if (!nextCursor && !prevCursor) {
            nextCursor = null;

            if (events.length > limit) {
                events.pop();
                nextCursorValue = events[events.length - 1]._id.toString();
            }
        } else if (nextCursor) {
            previousCursorValue = events[0]._id.toString();
            if (events.length > limit) {
                events.pop();
                nextCursorValue = events[events.length - 1]._id.toString();
            } else {
                nextCursorValue = null;
            }
        } else if (prevCursor) {
            nextCursorValue = events[0]._id.toString();
            if (events.length > limit) {
                events.pop(); // for asc OK
                previousCursorValue = events[events.length - 1]._id.toString();
            } else {
                previousCursorValue = null;
            }

            events.reverse();
        }

        return { events, nextCursorValue, previousCursorValue };

    }

    async findById(id: string): Promise<Event> {
        try {
            const event  = await this.eventModel.findOne({_id: id, deletedAt: null})
                .select('name address startDate endDate place mapAddress').exec();
            if (!event) {
                throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
            }

            return event;
        } catch (error) {
            // castError: here when id length bigger than original
            if (error.name == 'CastError' || error.message.indexOf('Cast to ObjectId failed') !== -1) {
                throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
            }

            throw error;
        }
    }

    async update(id: string, eventData: UpdateEventDto): Promise<Event> {
        try {
            const updatedEvent = await this.eventModel.findOneAndUpdate(
                { _id: id, deletedAt: null },
                { $set: eventData },
                { new: true }
            );

            if (!updatedEvent) {
                throw new HttpException('Event data is not updated', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return updatedEvent;

        } catch (error) {
            throw error;
        }
    }


    async delete(id: string): Promise<Event> {
        try {
            const event  = await this.eventModel.findOne({_id: id, deletedAt: null}).exec();
            if (!event) {
                throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
            }

            event.deletedAt = new Date();
            return event.save();
        } catch (error) {
            if (error.name == 'CastError' || error.message.indexOf('Cast to ObjectId failed') !== -1) {
                throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
            }

            throw error;
        }
    }

    async isEventExists(id: string): Promise<boolean> {
        try {
            const count = await this.eventModel.countDocuments({ _id: id, deletedAt: null });
            return count > 0;
        } catch (error) {
            if (error.name === 'CastError' || error.message.indexOf('Cast to ObjectId failed') !== -1) {
                throw new NotFoundException(sprintf(NOT_FOUND, 'event'));
            }

            throw error;
        }
    }
}