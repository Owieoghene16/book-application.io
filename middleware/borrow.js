/* eslint-disable import/prefer-default-export */
import db from '../database/database';

const findBook = db.book;

export const validateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookToBorrow = await findBook.findOne({ where: { id } });
    if (!bookToBorrow) return res.status(500).json({ message: 'Book not found' });
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
