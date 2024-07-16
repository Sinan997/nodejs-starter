import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/user';
import { LoginRequestBody, UserJwtPayload } from '../interfaces/auth';
import { LogoutRequestBody } from '../interfaces/auth/logout-request-body';

function generateToken(user: UserDocument | UserJwtPayload, secretKey: string = 'random', expiresIn: string) {
  const options = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(options, secretKey, { expiresIn });
}

const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        code: 'USER_NOT_FOUND_AUTH',
        data: { username },
        message: `User named '${username}' not found.`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ code: 'WRONG_PASSWORD', message: 'Wrong Password.' });
    }

    const accessToken = generateToken(user, process.env.JWT_SECRET_KEY, '1h');
    const refreshToken = generateToken(user, process.env.JWT_REFRESH_KEY, '1d');

    return res.status(200).json({
      accessToken,
      refreshToken,
      code: 'LOGIN_SUCCESSFULL',
      message: 'Logged in succesfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 'SERVER_ERROR', message: 'Server failed.' });
  }
};

const refreshTokenController = async (req: Request<{}, {}, LogoutRequestBody>, res: Response) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(403).json({ code: 'REFRESH_TOKEN_NOT_FOUND_BODY', message: 'Refresh token not found.' });
    }

    const decodedToken = jwt.decode(refreshToken) as UserJwtPayload;

    if (new Date().getTime() > decodedToken.exp! * 1000) {
      return res.status(403).json({
        code: 'REFRESH_TOKEN_EXPIRED',
        message: 'Refresh token has expired.',
      });
    }

    const user: UserJwtPayload = {
      _id: decodedToken._id,
      email: decodedToken.email,
      username: decodedToken.username,
      role: decodedToken.role,
    };

    const newAccessToken = generateToken(user, process.env.JWT_SECRET_KEY, '1h');
    const newRefreshToken = generateToken(user, process.env.JWT_REFRESH_KEY, '1d');

    return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 'SERVER_ERROR', message: 'Server failed.' });
  }
};

export { loginController, refreshTokenController };
