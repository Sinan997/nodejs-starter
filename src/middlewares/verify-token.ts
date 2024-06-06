import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../interfaces/auth';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('unauthorized');
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.body.role = (jwt.decode(token) as UserJwtPayload).role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};
