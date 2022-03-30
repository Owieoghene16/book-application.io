const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.USER, 'iiiiiiiiiiii', process.env.PASSWORD, 'mmmmmmmmmmm', process.env.DATABASE);
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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    user: 'USER',
    username: 'USER',
    password: 'PASSWORD',
    database: 'DATABASE',
    host: 'HOST',
    port: '5432',
    dialectOptions: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
