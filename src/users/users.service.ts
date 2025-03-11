import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UtilService } from '@util/util.service';
import { Protocol } from '@util/protocol';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly utilService: UtilService,
  ) {}

  /* 📄 user domain validate */
  async isDuplicatedEmail(email: string) {
    const count = await this.userRepository.countBy({ email });
    const errorProtocol = Protocol.Conflict;
    if (count > 0)
      throw new ConflictException(errorProtocol, 'email이 중복됩니다.');
  }

  async isDuplicatedUserId(userId: string) {
    const count = await this.userRepository.countBy({ userId });
    const errorProtocol = Protocol.Conflict;
    if (count > 0)
      throw new ConflictException(errorProtocol, 'userId가 중복됩니다.');
  }

  async isDuplicatedPhoneNumber(phone: string) {
    const count = await this.userRepository.countBy({ phone });
    const errorProtocol = Protocol.Conflict;
    if (count > 0)
      throw new ConflictException(errorProtocol, 'phoneNumber가 중복됩니다.');
  }
  /* user domain validate 📄 */

  async create(createUserDto: CreateUserDto) {
    await this.isDuplicatedEmail(createUserDto.email);
    await this.isDuplicatedUserId(createUserDto.userId);
    await this.isDuplicatedPhoneNumber(createUserDto.phone);

    const hashedPassword = this.utilService.createHashedPassword(
      createUserDto.email + createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const createdData = await this.userRepository.save(createUserDto);
    return { id: createdData.id };
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
      select: {
        id: true,
        userId: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    if (!user) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: '사용자를 찾지 못했습니다.',
      });
    }
    return user;
  }

  getMe(user: UserTokenData) {
    const id = user.id;
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
        email: true,
        phone: true,
        role: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
        email: true,
        phone: true,
        role: true,
      },
    });
    if (!user) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: '사용자를 찾지 못했습니다.',
      });
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      await this.isDuplicatedEmail(updateUserDto.email);
    }
    if (updateUserDto.userId) {
      await this.isDuplicatedUserId(updateUserDto.userId);
    }
    if (updateUserDto.phone) {
      await this.isDuplicatedPhoneNumber(updateUserDto.phone);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const userExists = await this.userRepository.countBy({ id });
    if (userExists === 0) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: '사용자를 찾지 못했습니다.',
      });
    }
    return this.userRepository.softDelete(id);
  }
}
