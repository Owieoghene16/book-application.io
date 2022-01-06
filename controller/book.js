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
      userId: req.user.id,
      include: [{
        association: Book.User,
      }],
    });
    res.status(200).json({
      message: 'Uploaded succesfully',
      book,
    });
  } catch (err) {
    res.status(400).json({ message: err });
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
    res.status(200).json({ updatedData });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const Books = await userBook.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ Books });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
