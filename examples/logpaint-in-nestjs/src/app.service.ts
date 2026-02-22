import { Injectable, NotFoundException } from '@nestjs/common';
import { log } from './logger';

@Injectable()
export class AppService {
  findAllUsers() {
    log.db('Querying all users');
    const users = ['Alice', 'Bob', 'Charlie'];
    log.success(`Fetched ${users.length} users from database`);
    return { users };
  }

  findUserById(id: string) {
    log.db(`Querying user with id=${id}`);

    if (id === '999') {
      log.warn(`User id=${id} not found`);
      throw new NotFoundException(`User with id=${id} not found`);
    }

    log.success(`Fetched user id=${id}`);
    return { id, name: 'Alice' };
  }

  createUser(name: string) {
    log.db('Inserting new user');
    log.debug('User data:', name);
    log.success(`User "${name}" created`);
    return { id: 1, name };
  }

  checkHealth() {
    log.info('Health check requested');
    return { status: 'ok', uptime: process.uptime() };
  }
}
