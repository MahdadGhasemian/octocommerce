import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateAddressForOtherUserDto extends CreateAddressDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  user_id: number;
}
