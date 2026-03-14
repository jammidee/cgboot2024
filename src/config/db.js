const { Sequelize } = require('sequelize')

// connect to MySQL
const sequelize = new Sequelize('cloudgatedb', 'hospuser', 'hosppass@!!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // true for SQL logging
})

module.exports = sequelize