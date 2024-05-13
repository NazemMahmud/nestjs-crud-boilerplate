import { IsOptional, IsString, IsIn } from 'class-validator';

export class EventPaginateDto {
    @IsOptional()
    @IsString()
    nextCursor?: string;

    @IsOptional()
    @IsString()
    prevCursor?: string;

    @IsOptional()
    @IsString()
    limit?: string;

    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    orderBy?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsString()
    sort?: string; // sort key
}

export interface paginateParams {
    nextCursor: string,
    prevCursor: string,
    limit: number,
    orderBy: string,
    sortBy: string,
    sortField: string,
}