const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  production: {
    client: 'pg',
    dialect: 'postgres',
    connection: process.env.DATABASE_URL,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
