import { config } from '../config.js';
import SQ from 'sequelize';

const {host, user, database, password } = config.db;

export const Sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    loggin: false,
    timezone: '+09:00'
});