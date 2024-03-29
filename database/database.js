import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import Users from '../models/user';
import Books from '../models/book';
import Borrow from '../models/borrow';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  /* dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }, */
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = Users(sequelize, Sequelize);
db.book = Books(sequelize, Sequelize);
db.borrow = Borrow(sequelize, Sequelize);

export default db;
