import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}