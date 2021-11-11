/* eslint-disable eqeqeq */
import db from '../database/database';

const Tutorial = db.tutorials;

export function create(req, res) {
  const tutorial = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Some error occurred while creating the Tutorial.');
    });
}

export function findOne(req, res) {
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
}

export function findAll(req, res) {
  Tutorial.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('Some error occurred while retrieving tutorials.');
    });
}

export function deleteOne(req, res) {
  const { id } = req.params;
  Tutorial.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Tutorial was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Tutorial with id=${id}`,
      });
    });
}
