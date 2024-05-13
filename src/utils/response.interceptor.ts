import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context)),
            // catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
        );
    }

    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = response.statusCode;

        return {
            status: true,
            // path: request.url,
            statusCode,
            data: res,
        };
    }
}