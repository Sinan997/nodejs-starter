import { JwtPayload } from 'jsonwebtoken';

export interface UserJwtPayload extends JwtPayload {
  _id: string;
  email: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
