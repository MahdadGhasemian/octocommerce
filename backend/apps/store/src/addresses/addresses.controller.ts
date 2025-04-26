import {
  CurrentUser,
  Identifier,
  IdentifierQuery,
  JwtAuthAccessGuard,
  NoCache,
  Serialize,
} from '@app/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { GetAddressDto } from './dto/get-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
} from 'nestjs-paginate';
import { ADDRESS_PAGINATION_CONFIG } from './pagination-config';
import { ListAddressDto } from './dto/list-address.dto';
import { User } from '@app/store';
import { CreateAddressForOtherUserDto } from './dto/create-address-for-other-user.dto';

@ApiTags('Addresses')
@NoCache()
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UseGuards(JwtAuthAccessGuard)
  @Serialize(GetAddressDto)
  @ApiOkResponse({
    type: GetAddressDto,
  })
  async create(
    @CurrentUser() user: User,
    @Body() createAddresseDto: CreateAddressDto,
  ) {
    return this.addressesService.create(createAddresseDto, user);
  }

  @Post('other/user')
  @UseGuards(JwtAuthAccessGuard)
  @Serialize(GetAddressDto)
  @ApiOkResponse({
    type: GetAddressDto,
  })
  async createForOtherUser(
    @Body() createAddresseForOtherUserDto: CreateAddressForOtherUserDto,
  ) {
    return this.addressesService.createForOtherUser(
      createAddresseForOtherUserDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthAccessGuard)
  @Serialize(ListAddressDto)
  @ApiOkPaginatedResponse(GetAddressDto, ADDRESS_PAGINATION_CONFIG)
  @ApiPaginationQuery(ADDRESS_PAGINATION_CONFIG)
  async findAll(
    @Identifier() identifierQuery: IdentifierQuery,
    @Paginate() query: PaginateQuery,
  ) {
    return this.addressesService.findAll(query, identifierQuery);
  }

  @Get(':id')
  @UseGuards(JwtAuthAccessGuard)
  @Serialize(GetAddressDto)
  @ApiOkResponse({
    type: GetAddressDto,
  })
  async findOne(
    @Identifier() identifierQuery: IdentifierQuery,
    @Param('id') id: string,
  ) {
    return this.addressesService.findOne({ id: +id }, identifierQuery);
  }

  @Patch(':id')
  @Serialize(GetAddressDto)
  @UseGuards(JwtAuthAccessGuard)
  @ApiOkResponse({
    type: GetAddressDto,
  })
  async update(
    @Identifier() identifierQuery: IdentifierQuery,
    @Param('id') id: string,
    @Body() updateAddresseDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(
      +id,
      updateAddresseDto,
      identifierQuery,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthAccessGuard)
  async remove(
    @Identifier() identifierQuery: IdentifierQuery,
    @Param('id') id: string,
  ) {
    return this.addressesService.remove(+id, identifierQuery);
  }
}
