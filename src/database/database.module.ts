import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
      await mongoose.connect(config.get('MONGODB_URI')),
  },
];

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
