import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Terjadi kesalahan pada server';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as any;
        message = res.message || exception.message;
        errors = res.errors || null;
        
        // Handle validation errors
        if (Array.isArray(message)) {
          errors = message;
          message = 'Validasi gagal';
        }
      } else {
        message = exceptionResponse as string;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
      errors: errors,
      timestamp: new Date().toISOString(),
    });
  }
}
