import { Schema, model, Document } from 'mongoose';

interface IUser {
  token: string;
  userId: string;
}

export interface RefreshTokenDocument extends IUser, Document {}

const RefreshTokenSchema = new Schema<RefreshTokenDocument>({
  token: { type: String, required: true },
  userId: { type: String, required: true },
});

export default model<RefreshTokenDocument>('RefreshToken', RefreshTokenSchema);
