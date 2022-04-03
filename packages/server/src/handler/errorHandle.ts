import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Response } from "express";
import { i18n } from "src/i18n/translation";

@Catch(HttpException)
export class ControllerAdvice implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const exp : HttpException = exception.getResponse() as HttpException;
        const ctx = host.switchToHttp();
        const response : Response = ctx.getResponse<Response>();
        const statusCode : number = exception.getStatus();

        const message = Array.isArray(exp.message) ? exp.message : i18n.__(exp.message);

        Logger.error(exception);

        response
          .status(statusCode)
          .json({
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            message: message
          });
    }

}