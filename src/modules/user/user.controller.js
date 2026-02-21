class UserController {
  constructor(userService) {
    this.userService = userService
  }

  getUsers = async (req, res) => {
    const users = await this.userService.getUsers()
    res.json(users)
  }

  getUserById = async (req, res) => {
    const user = await this.userService.getById(req.params.id)
    res.json(user)
  }

  createUser = async (req, res) => {
    const user = await this.userService.create(req.body)
    res.status(201).json(user)
  }
}

module.exports = UserController