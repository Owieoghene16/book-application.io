import express from 'express';
import {
  createUser, loginUser,
} from '../controller/user';

const router = express.Router();

router.post('/signup', createUser);

router.post('/signin', loginUser);

export default router;
