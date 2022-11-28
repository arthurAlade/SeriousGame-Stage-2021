// database/config/config.js

require('dotenv').config();

module.exports = {
  development: {
    username: 'db-user',
    password: 'db-user',
    database: 'db-graphql',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    define: {
      timestamps: true,
      freezeTableName: true,
      quoteIdentifiers: false
    },
},
  test: {
    username: 'db-user',
    password: 'db-user',
    database: 'db-graphql',
    host: '127.0.0.1',
    dialect: 'mysql',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'TEST_DATABASE_URL',
  },
  production: {
    username: 'db-user',
    password: 'db-user',
    database: 'db-graphql',
    host: '127.0.0.1',
    dialect: 'mysql',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL',
  },
};


