import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { User } from './user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findByUserName(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(user: UserDTO): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  updateUser(userId: number, user: UserDTO): Promise<User> {
    return this.userModel.findOneAndUpdate({ id: userId }, user).exec();
  }

  deleteUser(userId: number): Promise<any> {
    return this.userModel.deleteOne({ id: userId }).exec();
  }
}
