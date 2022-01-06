import express from 'express';
import dotenv from 'dotenv';
import router from './route/routes';

dotenv.config();
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}.`);
});
