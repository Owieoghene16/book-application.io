import express from 'express';
import dotenv from 'dotenv';
import router from './route/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

export default app;
