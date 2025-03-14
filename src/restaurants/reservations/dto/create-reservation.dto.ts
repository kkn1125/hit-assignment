import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Reservation } from '../entities/reservation.entity';

export class CreateReservationDto extends PickType(Reservation, [
  'reserveStartAt',
  'reserveEndAt',
  'phone',
  'amount',
]) {
  @ApiProperty({ type: Number, example: [1, 2, 3] })
  @IsArray({
    message: '메뉴는 배열형태로 전달되어야 합니다.',
  })
  @ArrayMinSize(1, { message: '최소 하나 이상의 메뉴를 선택해주세요.' })
  @Type(() => Number)
  menu!: number[];
}
