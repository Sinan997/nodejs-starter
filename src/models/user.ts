import { Schema, model, Document } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default model<UserDocument>('User', UserSchema);
