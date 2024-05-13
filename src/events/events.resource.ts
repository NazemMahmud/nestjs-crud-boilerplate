import { Event } from "./schema/events.schema";
export interface IEventResponse {
    id: string,
    name: string,
    place?: string;
    address: string,
    mapAddress?: string;
    startDate: Date,
    endDate: Date
}

export const EventResource = (data: Event): Array<IEventResponse> => {
    let response: Array<IEventResponse> = [{
        id: data._id,
        name: data.name,
        address: data.address,
        startDate: data.startDate,
        endDate: data.endDate
    }];

    if (data.place) {
        response[0].place = data.place;
    }

    if (data.mapAddress) {
        response[0].mapAddress = data.mapAddress;
    }

    return response;
}


export const EventResourceCollection = (data: Array<Event>): Array<IEventResponse> => {
    const response = [];
    for(const item of data) {
        response.push( {
            id: item._id,
            name: item.name,
            address: item.address,
            startDate: item.startDate,
            endDate: item.endDate,
            place: item.place ?? '',
            mapAddress: item.mapAddress ?? ''
        });
    }
    return response;
}

export interface PaginateItems {
    nextCursorValue?: string,
    previousCursorValue?: string
}