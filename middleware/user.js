/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import db from '../database/database';

const Users = db.user;

export const validateEmailAndPassword = async (req, res, next) => {
  try {
    const {
      email,
      password,
      reEnterPassword,
    } = req.body;
    const oneEmailOnly = await Users.findOne({ where: { email } });
    if (oneEmailOnly) return res.status(500).json({ message: 'Email already registered' });
    if (password !== reEnterPassword) {
      return res.status(500).json({ message: 'reEnter Password' });
    }
    next();
  } catch (err) {
    res.status(200).json({ message: err });
  }
};

export const loginEmailAndPassword = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await Users.findOne({ where: { email } });
    req.user = user;
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      req.password = checkPassword;
    } else {
      return res.status(500).json({ message: 'Email not registered' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
