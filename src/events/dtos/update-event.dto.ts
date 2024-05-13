import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { Transform } from "class-transformer";
import { sanitizeData } from "../../utils/helpers";

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => sanitizeData(value).trim())
    name: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => sanitizeData(value).trim())
    place: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => sanitizeData(value).trim())
    address: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => sanitizeData(value).trim())
    mapAddress: string;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => sanitizeData(value).trim())
    startDate: string;

    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => sanitizeData(value).trim())
    endDate: string;
}