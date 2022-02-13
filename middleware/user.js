/* eslint-disable import/prefer-default-export */
export const validateEmailAndPassword = async (req, res, next) => {
  try {
    const {
      userName,
      email,
      password,
      reEnterPassword,
    } = req.body;
    if (!userName || !email || !password || !reEnterPassword) {
      return res.status(401).json({
        message: 'Fill the form throughly',
      });
    }
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
    if (!email || !password) {
      return res.status(401).json({
        message: 'Fill the form throughly',
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
