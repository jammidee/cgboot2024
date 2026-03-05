const User = require('./user.model')

class UserService {
  async getUsers() {
    return User.findAll() // returns all users from MySQL
  }

  async getById(id) {
    return User.findByPk(id)
  }

  async create(data) {
    return User.create(data)
  }
}

module.exports = UserService