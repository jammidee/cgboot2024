/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const LoginController = require('./login.controller')
const LoginService = require('./login.service')

const controller = new LoginController(new LoginService())

/**
 * GET /login
 * Displays login page
 */
router.get('/', controller.showLoginPage)

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