/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const express           = require('express')
const router            = express.Router()

const AuthController    = require('./auth.controller')
const AuthService       = require('./auth.service')

const controller = new AuthController(new AuthService())

/**
 * GET /login
 * Displays login page
 */
router.get('/login', controller.showLoginPage)

/**
 * POST /login
 * Processes login
 */
router.post('/', controller.login)

/**
 * POST /login/logout
 */
router.post('/logout', controller.logout)

module.exports = router