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
      description,
    } = req.body;

    const uploadedImage = await cloudinary.uploader.upload(req.files[0].path);
    const uploadedBook = await cloudinary.uploader.upload(req.files[1].path);
    await userBook.create({
      title,
      author,
      price,
      description,
      imageUrl: uploadedImage.secure_url,
      bookUrl: uploadedBook.secure_url,
      creatorId: req.user.id,
      include: [{
        association: Book.User,
      }],
    });
    return res.status(201).json({
      message: 'Book Created Succesfully',
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error occured while creating the book' });
  }
};

export const modifyBook = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      title,
      author,
      price,
      description,
    } = req.body;

    await userBook.update({
      title,
      author,
      price,
      description,
    }, { where: { id } });
    return res.status(200).json({ message: 'Book updated sucessfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBook = await userBook.findByPk(id);
    return res.status(200).json({ singleBook });
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

export const getAllBooks = async (req, res) => {
  try {
    const createdBooks = await userBook.findAll({});
    return res.status(200).json({ createdBooks });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await userBook.destroy({ where: { id } });
    return res.status(200).json({ message: 'Book has been deleted sucessfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
