const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
})

module.exports = User