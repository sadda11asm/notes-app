"use strict";

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
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.TEST_DB_NAME,
    "host": process.env.DB_HOST,
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
};
//# sourceMappingURL=config.js.map