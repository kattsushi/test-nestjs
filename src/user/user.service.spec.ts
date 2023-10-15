import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserService } from './user.service';

// Mock the user model and its methods
const userModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
  exec: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_MODEL',
          useValue: userModelMock as unknown as Model<User>,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [{}, {}] as User[];
      userModelMock.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(users),
      });

      const result = await userService.getUsers();
      expect(result).toEqual(users);
    });
  });

  describe('findByUserName', () => {
    it('should return a user by username', async () => {
      const username = 'testUser';
      const user = {} as User;
      userModelMock.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await userService.findByUserName(username);
      expect(result).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userDTO = {} as User;
      const createdUser = {} as User;
      userModelMock.create.mockResolvedValue(createdUser);

      const result = await userService.createUser(userDTO);
      expect(result).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 1;
      const userDTO = {} as User;
      const updatedUser = {} as User;
      userModelMock.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedUser),
      });

      const result = await userService.updateUser(userId, userDTO);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 1;
      userModelMock.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      });

      const result = await userService.deleteUser(userId);
      expect(result).toEqual({});
    });
  });
});
