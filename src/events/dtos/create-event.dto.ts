import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { Transform } from "class-transformer";
import { sanitizeData } from "../../utils/helpers";

export class CreateEventDto {
    @IsNotEmpty()
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

    @IsNotEmpty()
    @IsDateString()
    @Transform(({ value }) => sanitizeData(value).trim())
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    @Transform(({ value }) => sanitizeData(value).trim())
    endDate: string;

    /**
     * nested item simple
     * todo: remove it to document
     */
    // @IsNotEmpty()
    // @ArrayMinSize(1) // Ensure array has at least one item
    // @ValidateNested({ each: true }) // Validate each item in the array
    // @Type(() => NestedItemDto) // Convert each item to NestedItemDto class
    // nestedItems: NestedItemDto[];
}