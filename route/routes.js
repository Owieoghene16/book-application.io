import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/jwt';
import { validateEmailAndPassword, loginEmailAndPassword } from '../middleware/user';
import { borrowBook, returnBooks, notReturnedBooks } from '../controller/borrow';
import { createUser, loginUser } from '../controller/user';
import {
  createBook, getUserBooks, modifyBook, deleteBook, getAllBooks,
} from '../controller/book';
import fileFilter from '../middleware/multer';

const upload = multer({ dest: 'uploads/files' });

const router = express.Router();

router.get('/signup', validateEmailAndPassword, createUser);

router.get('/signin', loginEmailAndPassword, loginUser);

router.get('/book', verifyToken, upload.array('file', 2), fileFilter, createBook);

router.post('/book/:id', verifyToken, modifyBook);

router.post('/user/book', verifyToken, getUserBooks);

router.post('/home', verifyToken, getAllBooks);

router.post('/book/:id/borrow', verifyToken, borrowBook);

router.put('/book/:id/borrow', verifyToken, returnBooks);

router.get('/book/:id/borrow?', verifyToken, notReturnedBooks);

router.delete('/book/:id', verifyToken, deleteBook);

export default router;
