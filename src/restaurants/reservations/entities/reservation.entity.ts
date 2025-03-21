import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { ReservationMenu } from '@restaurants/reservations/entities/reservation-menu.entity';
import { User } from '@users/entities/user.entity';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsPhoneNumberFormat } from '../../../common/phone.validate';
import { IsAfterStartTime } from '../reservation-date.validate';
import { IsDateTimeAfterNow } from '@common/datetime.validate';

@Entity()
export class Reservation {
  @ApiProperty({ type: Number, example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt({ message: '정수만 가능합니다.' })
  @Column({ type: 'int' })
  userId!: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt({ message: '정수만 가능합니다.' })
  @Column({ type: 'int' })
  restaurantId!: number;

  @ApiProperty({ type: Date, example: '2025-03-13T13:00' })
  @IsDate({ message: '시간 형식만 가능합니다.' })
  @IsDateTimeAfterNow()
  @Column({ type: 'datetime' })
  reserveStartAt!: Date;

  @ApiProperty({ type: Date, example: '2025-03-13T15:00' })
  @IsDate({ message: '시간 형식만 가능합니다.' })
  @IsAfterStartTime()
  @IsDateTimeAfterNow()
  @Column({ type: 'datetime' })
  reserveEndAt!: Date;

  @ApiProperty({ type: String, example: '010-1234-5678' })
  @IsOptional()
  @IsString({ message: '문자만 가능합니다' })
  @IsPhoneNumberFormat()
  @Column({ type: 'varchar', length: 13 })
  phone!: string;

  @ApiProperty({ type: Date, example: 5 })
  @IsInt({ message: '정수만 가능합니다.' })
  @Min(1, { message: '0이상의 정수만 가능합니다.' })
  @Column({ type: 'int', unsigned: true })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.reservations, { cascade: true })
  user!: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    cascade: true,
  })
  restaurant!: Restaurant;

  @OneToMany(
    () => ReservationMenu,
    (reservationMenu) => reservationMenu.reservation,
  )
  reservationMenus!: ReservationMenu[];
}
