import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\nLogging DELETE request ip', req.ip);
    console.log('Logging DELETE request params', req.params);
    console.log('Logging DELETE request headers', req.headers);
    next();
  }
}
