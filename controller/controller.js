/* eslint-disable eqeqeq */
import db from '../database/database';

const Tutorial = db.tutorials;

export const create = (req, res) => {
  const tutorial = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const { username, email, password } = tutorial;

  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Some error occurred while creating the Tutorial.');
    });
};

export const findOne = (req, res) => {
  const { id } = req.params;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send(
          `Cannot find Tutorial with id=${id}.`,
        );
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Tutorial with id=${id}`,
      });
    });
};

export const findAll = (req, res) => {
  Tutorial.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Some error occurred while retrieving tutorials.');
    });
};

export const deleteOne = (req, res) => {
  const { id } = req.params;
  Tutorial.destroy({
    where: { id },
  })
    .then(() => {
      if (!id) {
        res.send({
          message: `Cannot delete Tutorial of id ${id}, Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: `Tutorial of id ${id}  was deleted succesfully from the database `,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Tutorial with id = ${id}`,
      });
    });
};
