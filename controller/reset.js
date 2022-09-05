import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../database/database';

const Users = db.user;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const resetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email not registered' });

    const accessToken = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    await transporter.sendMail({
      from: ' "Bookstack" <owietutorial@gmail.com>',
      to: email,
      subject: 'Reset Password Requested',
      html: ` <p>Thank you for using the Bookstack.<br></br>
        Please note that this link is only valid for 60 minutes.<br></br></p>
        <a href="http://localhost:5000/reset-password/${email}/${accessToken}">
          http://localhost:5000/reset-password/${email}/${accessToken}
        </a>
      `,
    });
    return res.status(200).json({ message: 'Kindly check your email' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, accessToken } = req.params;
    const { newPassword } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
    if (email !== decoded.email) return res.status(400).json({ message: 'Link has expired' });
    const hash = await bcrypt.hash(newPassword, 10);

    await Users.update({
      password: hash,
    }, { where: { email } });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
