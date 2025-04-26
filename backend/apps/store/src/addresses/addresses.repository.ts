import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Address } from '@app/store';

@Injectable()
export class AddressesRepository extends AbstractRepository<Address> {
  protected readonly logger = new Logger(AddressesRepository.name);

  constructor(
    @InjectRepository(Address) addressesRepository: Repository<Address>,
    entityManager: EntityManager,
  ) {
    super(addressesRepository, entityManager);
  }
}
