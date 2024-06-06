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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const constants_1 = require("../constants");
const username = 'admin';
const password = '123';
const email = 'sinanozturk997@gmail.com';
const role = constants_1.Roles.Admin;
function connectDb() {
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        const isExist = yield user_1.default.findOne({ username: username });
        if (!isExist) {
            const hashedPw = yield bcryptjs_1.default.hash(password, 10);
            const user = new user_1.default({
                email: email,
                username: username,
                password: hashedPw,
                role: role,
            });
            yield user.save();
            console.log(`**********************\nAdmin user created.\nusername: ${username}\nemail: ${email}\npassword: ${password}\n**********************`);
        }
        console.log('connected to db');
    }))
        .catch((err) => {
        console.log(err);
    });
}
exports.default = connectDb;
