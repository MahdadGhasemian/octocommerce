import { ListDto } from '@app/common';
import { Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { GetAddressDto } from './get-address.dto';

export class ListAddressDto extends ListDto<GetAddressDto> {
  @IsArray()
  @Type(() => GetAddressDto)
  @Expose()
  data: GetAddressDto[];
}
