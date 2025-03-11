import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '@auth/guard/roles.decorator';
import { RoleGuard } from '@auth/guard/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인 회원 정보 조회' })
  @UseGuards(RoleGuard)
  @Roles()
  @Get('me')
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req.user);
  }

  @ApiOperation({ summary: '회원 정보 수정' })
  @UseGuards(RoleGuard)
  @Roles()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '회원 탈퇴' })
  @UseGuards(RoleGuard)
  @Roles()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
