import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { log } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      if (status >= 500) {
        log.error(`${req.method} ${req.originalUrl} ${status} — ${duration}ms`);
      } else if (status >= 400) {
        log.warn(`${req.method} ${req.originalUrl} ${status} — ${duration}ms`);
      } else {
        log.http(`${req.method} ${req.originalUrl} ${status} — ${duration}ms`);
      }
    });

    next();
  }
}
