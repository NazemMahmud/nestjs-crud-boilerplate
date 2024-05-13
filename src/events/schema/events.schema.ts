import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({
    collection: 'events',
    timestamps: true,
    toObject: {
        virtuals: true,
        transform: function (doc: any, ret: any) {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
    toJSON: {
        virtuals: true,
        transform: function (doc: any, ret: any) {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    }
})
export class Event extends Document {
    @Prop({ required: true })
    name: string; // todo, name unique

    @Prop({ default: '', trim: true })
    place?: string;

    @Prop({ required: true, trim: true })
    address: string;

    @Prop({ default: '', trim: true })
    mapAddress?: string;

    @Prop({ required: true, type: Date, trim: true })
    startDate: Date;

    @Prop({ required: true, type: Date, trim: true })
    endDate: Date;

    @Prop({ type: Date })
    deletedAt?: Date; // Soft delete field

    // todo: add event details field later, also image

}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('id').get(function () {
    return this._id;
});

export const primaryKey: string = '_id';
export const sortKey: string = '_id';