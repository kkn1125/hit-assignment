import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseSearchModel } from '@common/decorators/api.response.search.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
import { Roles } from '@middleware/roles.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { RestaurantOwnerGuard } from '@restaurants/restaurant-owner.guard';
import { UserRole } from '@util/enums/UserRole';
import { Protocol } from '@util/protocol';
import { Request } from 'express';
import { NumberArrayParsePipe } from '../../common/number-array-parse.pipe';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiResponseWithModel(
    {
      CreateReservationResponse: { id: 1 },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'GET',
      path: '/restaurants/:restaurantId/reservations/:reservationId',
    },
  )
  @ApiBodyWithModel({ CreateReservationDto })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 추가' })
  @Roles([UserRole.Customer])
  @Post()
  create(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: number,
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    createReservationDto: CreateReservationDto,
  ) {
    const user = req.user;
    return this.reservationsService.create(
      user,
      +restaurantId,
      createReservationDto,
    );
  }

  @ApiResponseSearchModel(
    { SearchReservationResponse: Reservation },
    '/restaurants/:restaurantId/reservations',
    {
      page: 2,
      count: 10,
      total: 3,
    },
  )
  @ApiQuery({
    name: 'menuName',
    type: String,
    example: '파스타',
    required: false,
  })
  @ApiQuery({
    name: 'reserveStartAt',
    type: Date,
    example: '2025-03-16T16:00',
    required: false,
  })
  @ApiQuery({
    name: 'reserveEndAt',
    type: Date,
    example: '2025-03-15T17:30',
    required: false,
  })
  @ApiQuery({
    name: 'phone',
    type: String,
    example: '010-1234',
    required: false,
  })
  @ApiQuery({
    name: 'amount',
    type: [Number],
    example: [1, 3],
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    example: DEFAULT_PAGE,
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    example: PER_PAGE,
    required: false,
  })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 전체 예약 조회' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Get()
  findAll(
    @Req() req: Request,
    @Query('menuName') menuName: string,
    @Param('restaurantId') restaurantId: number,
    @Query('reserveStartAt') reserveStartAt: Date,
    @Query('reserveEndAt') reserveEndAt: Date,
    @Query('phone') phone: string,
    @Query('amount', NumberArrayParsePipe) amount: number[],
    @Query(
      'page',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    page: number = DEFAULT_PAGE,
    @Query(
      'perPage',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    perPage: number = PER_PAGE,
  ) {
    const searchOption = { reserveStartAt, reserveEndAt, phone, amount };
    return this.reservationsService.findAll(
      req.originalUrl,
      restaurantId,
      page,
      perPage,
      searchOption,
    );
  }

  @ApiResponseWithModel(
    {
      FindOneReservationResponse: Reservation,
    },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'GET',
      path: '/restaurants/:restaurantId/reservations/:reservationId',
    },
  )
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'reservationId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 단건 예약 상세 조회' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Get(':reservationId')
  findOne(@Param('reservationId') reservationId: string) {
    return this.reservationsService.findOne(+reservationId);
  }

  @ApiResponseWithModel(
    {
      PatchReservationResponse: { id: 1 },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'PATCH',
      path: '/restaurants/:restaurantId/reservations/:reservationId',
    },
  )
  @ApiBodyWithModel({ UpdateReservationDto })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'reservationId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 수정' })
  @Roles([UserRole.Customer])
  @Patch(':reservationId')
  update(
    @Param('reservationId') reservationId: string,
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(
      +reservationId,
      updateReservationDto,
    );
  }

  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'reservationId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 예약 취소' })
  @Roles([UserRole.Customer])
  @Delete(':reservationId')
  remove(@Param('reservationId') reservationId: string) {
    return this.reservationsService.remove(+reservationId);
  }
}
