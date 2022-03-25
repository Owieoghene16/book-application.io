/* eslint-disable import/prefer-default-export */
export const validateEmailAndPassword = (req, res, next) => {
  const {
    userName,
    email,
    password,
    reEnterPassword,
  } = req.body;
  if (!userName || !email || !password || !reEnterPassword) {
    return res.status(400).json({
      message: 'Fill the form throughly',
    });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Length of password must be 8 or above' });
  }
  if (password !== reEnterPassword) {
    return res.status(400).json({ message: 'reEnter Password' });
  }
  return next();
};

export const loginEmailAndPassword = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: 'Fill the form throughly',
    });
  }
  return next();
};
