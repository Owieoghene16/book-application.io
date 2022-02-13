/* eslint-disable import/no-cycle */
import Sequelize from 'sequelize';
import User from './user';
import Book from './book';

const Borrow = (sequelize, DataTypes) => {
  class borrow extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  borrow.init({
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'borrow',
  });
  borrow.belongsTo(User(sequelize, DataTypes), { through: 'Borrow', foreignKey: 'borrowerId' });
  borrow.belongsTo(Book(sequelize, DataTypes), { through: 'Borrow', foreignKey: 'bookId' });
  return borrow;
};

export default Borrow;
