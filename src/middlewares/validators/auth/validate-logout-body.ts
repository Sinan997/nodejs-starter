import { LogoutRequestBody } from '../../../interfaces/auth';
import { Request, Response, NextFunction } from 'express';

export function validateLogoutBody(req: Request<{}, {}, LogoutRequestBody>, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(406).json({ code: 'MISSING_FIELDS', message: 'Fill required places.' });
  }

  next();
}
