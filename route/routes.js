import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/jwt';
import { validateEmailAndPassword, loginEmailAndPassword } from '../middleware/user';
import { validateBook } from '../middleware/borrow';
import { borrowBook, returnBooks, notReturnedBooks } from '../controller/borrow';
import { createUser, loginUser } from '../controller/user';
import {
  createBook, getUserBooks, modifyBook, deleteBook,
} from '../controller/book';

const upload = multer({ dest: 'uploads/files' });
const router = express.Router();

router.post('/signup', validateEmailAndPassword, createUser);

router.post('/signin', loginEmailAndPassword, loginUser);

router.post('/book', verifyToken, upload.array('imageUrl', 2), createBook);

router.post('/book/:id', verifyToken, modifyBook);

router.post('/user/book', verifyToken, getUserBooks);

router.post('/book/:id/borrow', verifyToken, validateBook, borrowBook);

router.put('/book/:id/borrow', verifyToken, returnBooks);

router.get('/book/:id/borrow?', verifyToken, notReturnedBooks);

router.delete('/book/:id', verifyToken, deleteBook);

export default router;
