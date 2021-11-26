import db from '../database/database';

const Tutorial = db.tutorials;

export const createUser = async (req, res) => {
  const tutorial = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const { username, email, password } = tutorial;
  const tutor = await Tutorial.create(tutorial);
  try {
    res.status(500).json({
      data: tutor,
      message: 'Tutorial created successfully',
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  const tutor = await Tutorial.findByPk(id);
  try {
    res.status(500).json({ data: tutor });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllUser = async (req, res) => {
  const tutor = await Tutorial.findAll({});
  try {
    res.status(500).json({ data: tutor });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  Tutorial.destroy({
    where: { id },
  });
  try {
    res.status(500).json({ message: `Tutorial of id ${id}  was deleted succesfully from the database` });
  } catch (err) {
    res.status(500).send(err);
  }
};
