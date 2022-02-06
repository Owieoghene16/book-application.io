/* eslint-disable import/prefer-default-export */
import db from '../database/database';
import Borrow from '../models/borrow';

const userBook = db.book;
const borrowBooks = db.borrow;

export const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookToBorrow = await userBook.findOne({ where: { id: req.book.id } });
    await borrowBooks.create({
      title: bookToBorrow.title,
      author: bookToBorrow.author,
      price: bookToBorrow.price,
      imageUrl: bookToBorrow.imageUrl,
      bookUrl: bookToBorrow.bookUrl,
      creatorId: bookToBorrow.creatorId,
      borrowerId: id,
      include: [{
        association: Borrow.User,
      }],
    });
    const borrowedBook = await borrowBooks.findAll({ where: { borrowerId: id } });
    res.status(200).json({ borrowedBook });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const returnBooks = async (req, res) => {
  try {
    const { id } = req.params;
    await borrowBooks.update({
      isActive: true,
    }, { where: { id: req.book.id } });
    const returnedBook = await borrowBooks.findAll({ where: {
      borrowerId: id,
      isActive: true,
    },
    });
    res.status(200).json({ returnedBook });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const notReturnedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const notReturned = await borrowBooks.findAll({ where: {
      borrowerId: id,
      isActive: false,
    },
    });
    res.status(200).json({ notReturned });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
