import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { IdentifierQuery, getPaginationConfig } from '@app/common';
import { GetAddressDto } from './dto/get-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { ADDRESS_PAGINATION_CONFIG } from './pagination-config';
import { Address, User } from '@app/store';
import { CreateAddressForOtherUserDto } from './dto/create-address-for-other-user.dto';

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async create(createAddresseDto: CreateAddressDto, user: User) {
    const addresse = new Address({
      ...createAddresseDto,
      user_id: user.id,
    });

    const result = await this.addressesRepository.create(addresse);

    return this.findOne({ id: result.id }, { user_id: user.id });
  }

  async createForOtherUser(
    createAddresseForOtherUserDto: CreateAddressForOtherUserDto,
  ) {
    const addresse = new Address({
      ...createAddresseForOtherUserDto,
    });

    const result = await this.addressesRepository.create(addresse);

    return this.findOne(
      { id: result.id },
      { user_id: createAddresseForOtherUserDto.user_id },
    );
  }

  async findAll(query: PaginateQuery, identifierQuery: IdentifierQuery) {
    return paginate(
      query,
      this.addressesRepository.entityRepository,
      getPaginationConfig(ADDRESS_PAGINATION_CONFIG, identifierQuery),
    );
  }

  async findOne(addresseDto: GetAddressDto, identifierQuery: IdentifierQuery) {
    return this.addressesRepository.findOne({
      ...addresseDto,
      ...identifierQuery,
    });
  }

  async findOneNoCheck(
    addresseDto: GetAddressDto,
    identifierQuery: IdentifierQuery,
  ) {
    return this.addressesRepository.findOneNoCheck({
      ...addresseDto,
      ...identifierQuery,
    });
  }

  async update(
    id: number,
    updateAddresseDto: UpdateAddressDto,
    identifierQuery: IdentifierQuery,
  ) {
    const updateData: Partial<Address> = {
      ...updateAddresseDto,
    };

    const result = await this.addressesRepository.findOneAndUpdate(
      { id, ...identifierQuery },
      { ...updateData },
    );

    return this.findOne({ id: result.id }, identifierQuery);
  }

  async remove(id: number, identifierQuery: IdentifierQuery) {
    return this.addressesRepository.findOneAndDelete({
      id,
      ...identifierQuery,
    });
  }
}
