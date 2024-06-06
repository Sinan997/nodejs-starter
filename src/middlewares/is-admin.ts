import { Request, Response, NextFunction } from 'express';
import { Roles } from '../constants';

const isAdmin = (req: Request<{}, {}, { role: string }>, res: Response, next: NextFunction) => {
  try {
    if (req.body.role === Roles.Admin) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send('unauthorized');
  }
};

module.exports = {
  isAdmin,
};
