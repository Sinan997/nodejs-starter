import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import connectDb from './utils/connect-db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT || 3000, () => {
  connectDb();

  console.log(`server started on port ${process.env.PORT || 3000}`);
});
