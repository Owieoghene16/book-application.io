/* eslint-disable import/prefer-default-export */
import Cloudinary from 'cloudinary';
import Book from '../models/book';
import db from '../database/database';

const userBook = db.book;
const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
    } = req.body;

    const uploadedImage = await cloudinary.uploader.upload(req.files[0].path);
    const uploadedBook = await cloudinary.uploader.upload(req.files[1].path);
    const book = await userBook.create({
      title,
      author,
      price,
      imageUrl: uploadedImage.secure_url,
      bookUrl: uploadedBook.secure_url,
      creatorId: req.user.id,
      include: [{
        association: Book.User,
      }],
    });
    return res.status(200).json({
      message: 'Uploaded succesfully',
      book,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const modifyBook = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      title,
      author,
      price,
    } = req.body;

    const updatedData = await userBook.update({
      title,
      author,
      price,
    }, { where: { id } });
    return res.status(200).json({ updatedData });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const books = await userBook.findAll({ where: { creatorId: req.user.id } });
    return res.status(200).json({ books });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await userBook.destroy({ where: { id } });
    return res.status(200).json({ message: 'Book is deleted' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
