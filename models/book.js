import Sequelize from 'sequelize';
import User from './user';

// eslint-disable-next-line no-shadow
const Books = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    bookUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  Book.User = Book.belongsTo(User(sequelize, DataTypes), { foreignKey: 'userId' });
  return Book;
};

export default Books;
