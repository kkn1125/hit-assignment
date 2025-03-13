import { Roles } from '@auth/guard/roles.decorator';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@util/enums/UserRole';
import { Request } from 'express';
import {
  CreateReservationDto,
  CreateReservationWithPhoneDto,
} from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 추가' })
  @Roles([UserRole.Customer])
  @Post()
  create(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: number,
    @Body()
    createReservationDto: CreateReservationDto | CreateReservationWithPhoneDto,
  ) {
    const user = req.user;
    return this.reservationsService.create(
      +user.id,
      +restaurantId,
      createReservationDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 전체 예약 조회' })
  @Roles([UserRole.Shopkeeper])
  @Get()
  findAll(
    @Param('restaurantId') restaurantId: number,
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('perPage') perPage: number = PER_PAGE,
  ) {
    return this.reservationsService.findAll(restaurantId, page, perPage);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 단건 예약 상세 조회' })
  @Roles([UserRole.Shopkeeper])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 수정' })
  @Roles([UserRole.Customer])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 취소' })
  @Roles()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
