import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const verifyToken = async (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) {
    res.status(401).json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
  next();
};
