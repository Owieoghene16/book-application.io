import knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.DB_ENV || 'production';

export default knex(knexConfig[environment]);
