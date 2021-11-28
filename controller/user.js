import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../database/database';

dotenv.config();
const saltRounds = 10;
const Users = db.user;

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({ username, email, password: hash });
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    res.status(200).json({
      data: user,
      message: 'User created successfully',
      token,
    });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      if (checkPassword) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(400).json({ error: 'Invalid Password' });
      }
    } else {
      res.status(401).json({ error: 'User does not exist' });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
