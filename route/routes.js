import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/jwt';
import { resetLink, resetPassword } from '../controller/reset';
import { validateEmailAndPassword, loginEmailAndPassword } from '../middleware/user';
import {
  borrowBook, returnBooks, notReturnedBooks, borrowedHistory, getReturnBooks,
} from '../controller/borrow';
import { createUser, loginUser } from '../controller/user';
import {
  createBook, getUserBooks, modifyBook, deleteBook, getAllBooks, getOneBook,
} from '../controller/book';
import fileFilter from '../middleware/multer';

const upload = multer({ dest: 'uploads/files' });

const router = express.Router();

router.post('/signup', validateEmailAndPassword, createUser);

router.post('/signin', loginEmailAndPassword, loginUser);

router.patch('/forgot-password', resetLink);

router.patch('/reset-password/:email/:accessToken', resetPassword);

router.get('/home', verifyToken, getAllBooks);

router.post('/book', verifyToken, upload.array('file', 2), fileFilter, createBook);

router.get('/book/:id', getOneBook);

router.post('/book/:id', verifyToken, modifyBook);

router.post('/user/book', verifyToken, getUserBooks);

router.post('/book/:id/borrow', verifyToken, borrowBook);

router.put('/book/:id/borrow', verifyToken, returnBooks);

router.get('/borrow', verifyToken, borrowedHistory);

router.get('/return', verifyToken, getReturnBooks);

router.get('/book/:id/borrow?', verifyToken, notReturnedBooks);

router.delete('/book/:id', verifyToken, deleteBook);

export default router;
