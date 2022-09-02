import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './route/routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'App is running' });
});

export default app;
