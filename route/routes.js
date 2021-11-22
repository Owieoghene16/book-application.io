import express from 'express';
import dotenv from 'dotenv';
import {
  createUser, getAllUser, getUser, deleteUser,
} from '../controller/controller';

dotenv.config();

const router = express.Router();

router.post('/', createUser);

router.get('/env', (req, res) => {
  res.send(process.env.HOST);
});

router.get('/', getAllUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

export default router;
