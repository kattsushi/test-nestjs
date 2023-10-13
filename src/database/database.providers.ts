import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb+srv://andres:C5CY7JldBWPrfgtZ@users.u8dpn57.mongodb.net/',
      ),
  },
];
