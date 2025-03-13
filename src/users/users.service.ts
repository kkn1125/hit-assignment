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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly utilService: UtilService,
  ) {}

  /* user's util */
  async throwNoExistsUserWithSelectBy(
    whereOption: FindOptionsWhere<User>,
    selectOption?: FindOptionsSelect<User>,
  ) {
    const user = await this.userRepository.findOne({
      where: whereOption,
      select: selectOption,
    });

    if (!user) {
      const errorProtocol = Protocol.NoMatchUser;
      throw new NotFoundException(errorProtocol);
    }

    return user;
  }

  async isDuplicatedBy<T extends object>(whereOption: T) {
    const count = await this.userRepository.countBy(whereOption);
    const errorProtocol = Protocol.Conflict;
    if (count > 0) {
      throw new ConflictException(errorProtocol, 'email이 중복됩니다.');
    }
    return { result: true };
  }

  async comparePassword(userId: string, inputPassword: string) {
    const user = await this.throwNoExistsUserWithSelectBy({ userId });
    const message = userId + inputPassword;
    const hashedPassword = this.utilService.createHashedPassword(message);

    if (user.password !== hashedPassword) {
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
    const user = await this.throwNoExistsUserWithSelectBy(
      { userId },
      this.userSelectOption,
    );

    return user;
  }

  async getMe(userTokenData: UserTokenData) {
    const id = userTokenData.id;

    const user = await this.throwNoExistsUserWithSelectBy(
      { id },
      this.userSelectOption,
    );

    return user;
  }

  async findOne(id: number) {
    const user = await this.throwNoExistsUserWithSelectBy(
      { id },
      this.userSelectOption,
    );

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.throwNoExistsUserWithSelectBy({ id });

    if (updateUserDto.email) {
      await this.isDuplicatedBy({ email: updateUserDto.email });
    }
    if (updateUserDto.userId) {
      await this.isDuplicatedBy({ userId: updateUserDto.userId });
    }
    if (updateUserDto.phone) {
      await this.isDuplicatedBy({ phone: updateUserDto.phone });
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.throwNoExistsUserWithSelectBy({ id });

    return this.userRepository.softDelete(id);
  }
}
