import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { Roles } from '../constants';

const username = 'admin';
const password = '123';
const email = 'sinanozturk997@gmail.com';
const role = Roles.Admin;

export default function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(async () => {
      const isExist = await User.findOne({ username: username });

      if (!isExist) {
        const hashedPw = await bcrypt.hash(password, 10);
        const user = new User({
          email: email,
          username: username,
          password: hashedPw,
          role: role,
        });
        await user.save();

        console.log(`**********************\nAdmin user created.\nusername: ${username}\nemail: ${email}\npassword: ${password}\n**********************`);
      }

      console.log('connected to db');
    })
    .catch((err) => {
      console.log(err);
    });
}
