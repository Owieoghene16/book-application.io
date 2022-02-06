import Sequelize from 'sequelize';
import User from './user';

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
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    bookUrl: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    creatorId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'borrow',
  });
  borrow.User = borrow.belongsTo(User(sequelize, DataTypes), { foreignKey: 'borrowerId' });
  return borrow;
};

export default Borrow;
