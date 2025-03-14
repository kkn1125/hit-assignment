import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReservationMenu extends BaseEntity {
  @ApiProperty({ type: Number, example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  menuId!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  reservationId!: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationMenus, {
    cascade: true,
  })
  reservation!: Reservation;

  @ManyToOne(() => Menu, (menu) => menu.reservationMenus, { cascade: true })
  menu!: Menu;
}
