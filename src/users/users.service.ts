import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Protocol } from '@util/protocol';
import { UtilService } from '@util/util.service';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  searchPagination,
  throwNoExistsEntityWithSelectBy,
} from '@util/utilFunction';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';

@Injectable()
export class UsersService {
  userSelectOption = {
    id: true,
    userId: true,
    email: true,
    phone: true,
    role: true,
  };

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly utilService: UtilService,
  ) {}

  async isDuplicatedBy<T extends object>(whereOption: T) {
    const count = await this.userRepository.countBy(whereOption);
    const errorProtocol = Protocol.Conflict;
    if (count > 0) {
      throw new ConflictException(errorProtocol, 'email이 중복됩니다.');
    }
    return { result: true };
  }

  async comparePassword(userId: string, inputPassword: string) {
    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { userId },
    });
    const message = userId + inputPassword;
    const isSamePassword = this.utilService.compareInputPasswordWith(
      message,
      user.password,
    );

    if (!isSamePassword) {
      const errorProtocol = Protocol.WrongLoginData;
      throw new BadRequestException(errorProtocol);
    }

    return user;
  }
  /* user's util */

  async create(createUserDto: CreateUserDto) {
    await this.isDuplicatedBy({ email: createUserDto.email });
    await this.isDuplicatedBy({ userId: createUserDto.userId });
    await this.isDuplicatedBy({ phone: createUserDto.phone });

    const hashedPassword = this.utilService.createHashedPassword(
      createUserDto.userId + createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const createdData = await this.userRepository.save(createUserDto);
    return { id: createdData.id };
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByUserId(userId: string) {
    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { userId },
      select: this.userSelectOption,
    });

    return user;
  }

  async getMe(userTokenData: UserTokenData) {
    const id = userTokenData.id;

    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { id },
      select: this.userSelectOption,
    });

    return user;
  }

  async getMeResrvations(
    userTokenData: UserTokenData,
    page: number,
    perPage: number,
  ) {
    const userId = userTokenData.id;
    const reservations = await searchPagination(
      this.reservationRepository,
      '/users/me/reservations',
      {
        where: {
          userId,
        },
        relations: {
          restaurant: true,
          reservationMenus: true,
        },
        take: perPage,
        skip: (page - 1) * perPage,
      },
      page,
      perPage,
    );
    return reservations;
  }

  async findOne(id: number) {
    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { id },
      select: this.userSelectOption,
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { id },
    });

    if (updateUserDto.email) {
      await this.isDuplicatedBy({ email: updateUserDto.email });
    }
    if (updateUserDto.userId) {
      await this.isDuplicatedBy({ userId: updateUserDto.userId });
    }
    if (updateUserDto.phone) {
      await this.isDuplicatedBy({ phone: updateUserDto.phone });
    }

    if (updateUserDto.password) {
      const hashedPassword = this.utilService.createHashedPassword(
        user.userId + updateUserDto.password,
      );
      updateUserDto.password = hashedPassword;
    }

    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: number) {
    await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { id },
    });

    return this.userRepository.softDelete(id);
  }
}
