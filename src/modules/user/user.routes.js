const express = require('express')
const router = express.Router()

const UserController = require('./user.controller')
const UserService = require('./user.service')

const controller = new UserController(new UserService())

router.get('/', controller.getUsers)
router.get('/:id', controller.getUserById)
router.post('/', controller.createUser)

module.exports = router