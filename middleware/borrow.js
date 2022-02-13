/* eslint-disable import/prefer-default-export */
import db from '../database/database';

const findBook = db.book;
const borrowBook = db.borrow;

export const validateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookToBorrow = await findBook.findOne({ where: { id } });
    if (!bookToBorrow) return res.status(500).json({ message: 'Book not found' });
    const borrowOneBook = await borrowBook.findOne({ where: {
      borrowerId: req.user.id,
      bookId: id,
      },
    });
    if (borrowOneBook) return res.status(401).json({ message: 'Book has been borrowed by you' });
    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
