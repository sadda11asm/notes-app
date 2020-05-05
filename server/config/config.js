require('dotenv').config();

module.exports = {
  "development": {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "host": process.env.DB_HOST,
    "dialect": 'postgres',
    "operatorsAliases": false
  },
  "test": {
    "username": "saddam",
    "password": null,
    "database": "notes-test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "saddam",
    "password": null,
    "database": "notes-prod",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
