/* eslint-disable import/no-import-module-exports */
import knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.DB_ENV || 'production';
module.exports = knex(knexConfig[environment]);
