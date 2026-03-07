/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:30 PM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const UserController = require('./user.controller')
const UserService = require('./user.service')

const controller = new UserController(new UserService())

router.get('/', controller.getUsers)
router.get('/:id', controller.getUserById)
router.post('/', controller.createUser)

// Login routes
router.post('/login', controller.login)
router.post('/logout', controller.logout)

module.exports = router