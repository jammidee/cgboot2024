
const userService = require('../../../services/api/v1/user/user.service')

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers() // errors auto handled
  res.json(users)
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  res.json({ id, name: 'Jammi 😄' })
}

exports.createUser = async (req, res) => {
  const data = req.body
  res.status(201).json(data)
}


// example only
async function fakeDB() {
  return [{ id: 1, name: 'John' }]
}