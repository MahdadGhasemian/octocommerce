import { Controller, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  EVENT_NAME_USER_CREATED,
  EVENT_NAME_USER_UPDATED,
  MessageAckInterceptor,
  UserCreatedEvent,
  UserUpdatedEvent,
} from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(EVENT_NAME_USER_CREATED)
  @UseInterceptors(MessageAckInterceptor)
  async userCreated(@Payload() payload: UserCreatedEvent) {
    // create user
    await this.usersService.create(payload.user);
  }

  @EventPattern(EVENT_NAME_USER_UPDATED)
  @UseInterceptors(MessageAckInterceptor)
  async userUpdated(@Payload() payload: UserUpdatedEvent) {
    await this.usersService.update(payload.user.id, payload.user);
  }
}
