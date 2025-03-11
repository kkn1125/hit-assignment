import { Roles } from '@auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@users/enums/UserRole';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: '식당 예약 추가' })
  @Roles([UserRole.Customer])
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @ApiOperation({ summary: '식당 예약 조회' })
  @Roles()
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @ApiOperation({ summary: '식당 예약 상세 조회' })
  @Roles()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @ApiOperation({ summary: '식당 예약 수정' })
  @Roles([UserRole.Customer])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @ApiBearerAuth('authorization')
  @ApiOperation({ summary: '식당 예약 취소' })
  @Roles()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
