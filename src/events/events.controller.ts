import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Event, primaryKey, sortKey } from './schema/events.schema';
import { CreateEventDto } from "./dtos/create-event.dto";
import { EventPaginateDto} from "./dtos/paginate-event.dto";
import { UpdateEventDto } from "./dtos/update-event.dto";
import { EventService } from './events.service';
import { EventsRepository } from "./events.repository";
import { EventResource, IEventResponse, EventResourceCollection, PaginateItems } from "./events.resource";
import { sprintf } from "../utils/helpers";
import { DELETE_SUCCESS } from "../utils/constants";


@Controller('events')
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly eventRepo: EventsRepository,
    ) {}

    @Post()
    async create(@Body() eventData: CreateEventDto): Promise<Array<IEventResponse>> {
        const data = await this.eventRepo.create(eventData);
        return EventResource(data);
    }

    @Get()
    async findAll(@Query() query: EventPaginateDto): Promise<{events: IEventResponse[], pagination: PaginateItems}>  {
        // todo: LATER move this to service
        const params = {
            nextCursor: query.nextCursor ?? '',
            prevCursor: query.prevCursor ?? '',
            limit: query.limit ? parseInt(query.limit) : 10,
            orderBy: query.orderBy ?? 'desc',
            sortBy: query.sortBy ?? primaryKey,
            sortField: query.sort ?? sortKey,
        };

        // todo: error exception is queryparameter is wrong value or extra wrong parameter is sent
        const data = await this.eventRepo.findAll(params);
        const events = EventResourceCollection(data.events);

        return {
            events,
            pagination: {
                nextCursorValue: data.nextCursorValue,
                previousCursorValue: data.previousCursorValue
            },
        };
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Event> {
        return this.eventRepo.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() eventData: UpdateEventDto): Promise<Array<IEventResponse>> {
        // todo: unique name check LATER
        const data = await this.eventService.update(id, eventData);
        return EventResource(data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string } >  {
        const res =  await this.eventRepo.delete(id);
        return { message: sprintf(DELETE_SUCCESS, 'event') };
    }
}