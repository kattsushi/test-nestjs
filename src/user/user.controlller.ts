import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/user/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Put(':id')
  updateUser(@Param('id') userId, @Body() userDTO: UserDTO) {
    console.log('userDTO', typeof userDTO.id);
    return this.userService.updateUser(userId, userDTO);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
