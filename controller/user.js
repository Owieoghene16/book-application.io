import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/database';

const { Op } = Sequelize;
const saltRounds = 10;
const Users = db.user;

export const createUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({ userName, email, password: hash });
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return res.status(200).json({
      user,
      message: 'User created successfully',
      token,
    });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const {
      userName,
      id,
    } = req.user;
    if (req.password) {
      const token = await jwt.sign({ userName, id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      return res.status(200).json({
        token,
        message: 'Login successful',
      });
    } return res.status(400).json({ error: 'Invalid Password' });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};
