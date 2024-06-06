import { LoginRequestBody } from '../../../interfaces/auth';
import { Request, Response, NextFunction } from 'express';

export function validateLoginBody(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(406).json({ code: 'MISSING_FIELDS', message: 'Fill required places.' });
  }

  next();
}
