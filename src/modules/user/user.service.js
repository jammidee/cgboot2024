class UserService {
  async getUsers() {
    return [{ id: 1, name: 'Jammi 😄' }]
  }

  async getById(id) {
    return { id, name: 'Sample User' }
  }

  async create(data) {
    return { id: Date.now(), ...data }
  }
}

module.exports = UserService