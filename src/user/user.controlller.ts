import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/user/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  updateUser(@Param('id') userId, @Body() userDTO: UserDTO) {
    console.log('userDTO', typeof userDTO.id);
    return this.userService.updateUser(userId, userDTO);
  }

  @ApiParam({ name: 'id', type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
