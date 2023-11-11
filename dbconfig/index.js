const Sequelize = require('sequelize');
const dotenv= require('dotenv');

dotenv.config();

const db = new Sequelize(
    'db_skillshift',
    'skillshift-client',
    '@Vi{2~:]f;Kvi`9a',
    {
        host : '34.101.71.233',
        dialect: 'mysql',
    }
)

module.exports = db