import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/UserRole';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: String, example: 'testuser1' })
  @Column({ type: 'varchar', unique: true, length: 20 })
  userId!: string;

  @ApiProperty({ type: String, example: 'test1@example.com' })
  @Column({ type: 'varchar', unique: true, length: 100 })
  email!: string;

  @ApiProperty({ type: String, example: '김윤호' })
  @Column({ type: 'varchar', length: 20 })
  username!: string;

  @ApiProperty({ type: String, example: 'qweQQ!!1' })
  @Column({ type: 'varchar', length: 50 })
  password!: string;

  @ApiProperty({ type: () => UserRole, enum: UserRole, example: 1 })
  @Column({ type: 'int', unsigned: true })
  role!: UserRole;

  @ApiProperty({ type: () => String, example: '010-1234-5678' })
  @Column({ type: 'varchar', unique: true, length: 13 })
  phone!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants!: Restaurant[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations!: Reservation[];
}
