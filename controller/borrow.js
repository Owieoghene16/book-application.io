/* eslint-disable import/prefer-default-export */
import db from '../database/database';
import Borrow from '../models/borrow';

const borrowBooks = db.borrow;

export const borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    await borrowBooks.create({
      borrowerId: req.user.id,
      bookId: id,
      include: [{
        association: [Borrow.User, Borrow.Book],
      }],
    });
    res.status(200).json({
      message: 'Book has been borrowed succesfully',
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const returnBooks = async (req, res) => {
  try {
    const { id } = req.params;
    await borrowBooks.update({
      isActive: true,
    }, { where: { id } });
    res.status(200).json({ message: 'Book has been returned succesfully' });
  } catch (err) {
    res.status(500).json({ message: err });
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
    res.status(200).json({ notReturned });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
