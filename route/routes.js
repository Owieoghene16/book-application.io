import express from 'express';
import multer from 'multer';
import { createUser, loginUser } from '../controller/user';
import { createBook, getUserBooks, modifyBook } from '../controller/book';
import { verifyToken } from '../middleware/jwt';

const upload = multer({ dest: 'uploads/files' });
const router = express.Router();

router.post('/signup', createUser);

router.post('/signin', loginUser);

router.post('/book', verifyToken, upload.array('imageUrl', 2), createBook);

router.post('/book/:id', verifyToken, modifyBook);

router.post('/user/book', verifyToken, getUserBooks);

export default router;
