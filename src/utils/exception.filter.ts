import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // todo: because of the allexceptionfilter, this may not be working/or need anymore. WILL REMOVE LATER
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                data: { message: exception.message },
                success: false
                // timestamp: new Date().toISOString(),
                // path: request.url,
            });
    }
}


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = 'Internal server error';

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof BadRequestException) { // this is for validation error from class validator
            const response =  exception.getResponse();
            httpStatus = response['statusCode'];
            message = response['message'];
        }


        const responseBody = {
            statusCode: httpStatus,
            // timestamp: new Date().toISOString(),
            // path: httpAdapter.getRequestUrl(ctx.getRequest()),
            data: { message: message },
            success: false
        };

        // todo: in future a log here.
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}