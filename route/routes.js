import express from 'express';
import dotenv from 'dotenv';
import {
  create, findAll, findOne, deleteOne,
} from '../controller/controller';

dotenv.config();

const router = express.Router();

router.post('/', create);

router.get('/env', (req, res) => {
  res.send(process.env.HOST);
});

router.get('/', findAll);

router.get('/:id', findOne);

router.delete('/:id', deleteOne);

export default router;
