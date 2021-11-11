export default (sequelize, Sequelize) => {
  const Tutorial = sequelize.define('bookstack', {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return Tutorial;
};
