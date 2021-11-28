import express from 'express';
import { verifyToken } from '../middleware/auth';
import {
  createUser, loginUser,
} from '../controller/user';

const router = express.Router();

router.post('/register', verifyToken, createUser);

router.post('/login', verifyToken, loginUser);

export default router;
