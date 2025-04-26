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
import { User } from '@app/store';
import { AddressesService } from '../addresses/addresses.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  @EventPattern(EVENT_NAME_USER_CREATED)
  @UseInterceptors(MessageAckInterceptor)
  async userCreated(@Payload() payload: UserCreatedEvent) {
    const { user } = payload;

    // create user
    await this.usersService.create(user);

    // create address
    const address = {
      title: 'پیش فرض',
      name: `${user?.first_name || ''} ${user?.last_name || ''}`,
      mobile_phone: user?.mobile_phone?.replace('+98', '0'),
    };
    await this.addressesService.create(address, { id: user.id } as User);
  }

  @EventPattern(EVENT_NAME_USER_UPDATED)
  @UseInterceptors(MessageAckInterceptor)
  async userUpdated(@Payload() payload: UserUpdatedEvent) {
    await this.usersService.update(payload.user.id, payload.user);
  }
}
