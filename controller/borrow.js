/* eslint-disable import/prefer-default-export */
import db from '../database/database';
import Borrow from '../models/borrow';

const borrowBooks = db.borrow;
const findBook = db.book;

export const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookToBorrow = await findBook.findOne({ where: { id } });
    if (!bookToBorrow) return res.status(500).json({ message: 'Book not found' });

    const borrowOneBook = await borrowBooks.findOne({ where: {
      borrowerId: req.user.id,
      bookId: id,
      isActive: false,
    },
    });
    if (borrowOneBook) return res.status(401).json({ message: 'Book has been borrowed by you' });

    await borrowBooks.create({
      borrowerId: req.user.id,
      bookId: id,
      include: [{
        association: [Borrow.User, Borrow.Book],
      }],
    });
    return res.status(200).json({
      message: 'Book has been borrowed succesfully',
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const returnBooks = async (req, res) => {
  try {
    const { id } = req.params;
    await borrowBooks.update({
      isActive: true,
    }, { where: { bookId: id, borrowerId: req.user.id } });
    return res.status(200).json({ message: 'Book has been returned succesfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const notReturnedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const notReturned = await borrowBooks.findAll({
      where: {
        borrowerId: id,
        isActive: false,
      },
    });
    return res.status(200).json({ notReturned });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
