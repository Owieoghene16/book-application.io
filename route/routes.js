import express from 'express';
import multer from 'multer';
import { borrowBook, returnBooks, notReturnedBooks } from '../controller/borrow';
import { createUser, loginUser } from '../controller/user';
import { createBook, getUserBooks, modifyBook, deleteBook } from '../controller/book';
import { verifyUser, verifyBook } from '../middleware/jwt';

const upload = multer({ dest: 'uploads/files' });
const router = express.Router();

router.post('/signup', createUser);

router.post('/signin', loginUser);

router.post('/book', verifyUser, upload.array('imageUrl', 2), createBook);

router.post('/book/:id', verifyUser, modifyBook);

router.post('/user/book', verifyUser, getUserBooks);

router.post('/user/:id/book', verifyBook, borrowBook);

router.put('/user/:id/book', verifyBook, returnBooks);

router.get('/user/:id/book?', verifyBook, notReturnedBooks);

router.delete('/book/:id', verifyUser, deleteBook);

export default router;
