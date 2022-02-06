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
      reEnterPassword,
    } = req.body;

    const oneEmailOnly = await Users.findOne({ where: { email } });

    if (oneEmailOnly) return res.status(500).json({ message: 'Email already registered' });

    if (password === reEnterPassword) {
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
    } return res.status(200).json({ message: 'reEnter Password' });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      const token = await jwt.sign({
        userName: user.userName, id: user.id,
      }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      if (checkPassword) {
        return res.status(200).json({
          token,
          message: 'Login successful',
        });
      } return res.status(400).json({ error: 'Invalid Password' });
    } return res.status(400).json({ error: 'User does not exist' });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};
