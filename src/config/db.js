const { Sequelize } = require('sequelize')

// connect to MySQL
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // true for SQL logging
})

module.exports = sequelize