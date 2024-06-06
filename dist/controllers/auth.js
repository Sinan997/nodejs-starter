"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.logoutController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const refresh_token_1 = __importDefault(require("../models/refresh-token"));
function generateToken(user, secretKey = 'random', expiresIn) {
    const options = {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(options, secretKey, { expiresIn });
}
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({
                code: 'USER_NOT_FOUND_AUTH',
                data: { username },
                message: `User named '${username}' not found.`,
            });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ code: 'WRONG_PASSWORD', message: 'Wrong Password.' });
        }
        const accessToken = generateToken(user, process.env.JWT_SECRET_KEY, '1h');
        const refreshToken = generateToken(user, process.env.JWT_REFRESH_KEY, '1d');
        yield refresh_token_1.default.deleteMany({ userId: user._id });
        yield new refresh_token_1.default({ token: refreshToken, userId: user._id }).save();
        return res.status(200).json({
            accessToken,
            refreshToken,
            code: 'LOGIN_SUCCESSFULL',
            message: 'Logged in succesfully.',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ code: 'SERVER_ERROR', message: 'Server failed.' });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        yield refresh_token_1.default.deleteOne({ token: refreshToken });
        return res.status(200).json({ message: 'Logout completed successfully.' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ code: 'SERVER_ERROR', message: 'Server failed.' });
    }
});
exports.logoutController = logoutController;
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) {
            return res.status(403).json({ code: 'REFRESH_TOKEN_NOT_FOUND_BODY', message: 'Refresh token not found.' });
        }
        const isRefreshTokenExistInDb = yield refresh_token_1.default.findOne({ token: refreshToken });
        if (!isRefreshTokenExistInDb) {
            return res.status(403).json({ code: 'REFRESH_TOKEN_NOT_FOUND_DB', message: 'Refresh token not found.' });
        }
        yield refresh_token_1.default.findOneAndDelete({ token: refreshToken });
        const decodedToken = jsonwebtoken_1.default.decode(refreshToken);
        if (new Date().getTime() > decodedToken.exp * 1000) {
            return res.status(403).json({
                code: 'REFRESH_TOKEN_EXPIRED',
                message: 'Refresh token has expired.',
            });
        }
        const user = {
            _id: decodedToken._id,
            email: decodedToken.email,
            username: decodedToken.username,
            role: decodedToken.role,
        };
        const newAccessToken = generateToken(user, process.env.JWT_SECRET_KEY, '1h');
        const newRefreshToken = generateToken(user, process.env.JWT_REFRESH_KEY, '1d');
        yield new refresh_token_1.default({ token: newRefreshToken, userId: user._id }).save();
        return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ code: 'SERVER_ERROR', message: 'Server failed.' });
    }
});
exports.refreshTokenController = refreshTokenController;
