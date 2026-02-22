import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  log.success(`NestJS server running on http://localhost:${port}`);
  log.info('Available routes:');
  log.info('  GET  /');
  log.info('  GET  /users');
  log.info('  GET  /users/:id');
  log.info('  POST /users');
  log.info('  GET  /health');

  // ─── Showcase: Runtime Level Switching ──────────────────────
  log.debug('Debug mode is ON — you can see this message');
  log.setLevel('warn');
  log.info('This info message is HIDDEN after setLevel("warn")');
  log.warn('Only warn and error are visible now');
  log.setLevel('debug');
  log.debug('Debug mode restored — all levels visible again');
}
bootstrap();
