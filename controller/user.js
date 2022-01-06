import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/database';

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

    if (!oneEmailOnly && password === reEnterPassword) {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await Users.create({ userName, email, password: hash });
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.status(200).json({
        message: 'User created successfully',
        token,
      });
    } else {
      res.statsus(500).json({ message: 'Email already registered' });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      if (checkPassword) {
        res.status(200).json({
          token,
          message: 'Login successful',
        });
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
