import { Request, Response, NextFunction } from 'express';
import { Roles } from '../constants';

export const isAdmin = (req: Request<{}, {}, { role: string }>, res: Response, next: NextFunction) => {
  if (req.body.role !== Roles.Admin) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }
  
  next();
};
