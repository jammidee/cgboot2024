/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 08, 2026 08:20 AM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const WelcomeController = require('./welcome.controller')
const WelcomeService    = require('./welcome.service')

const controller = new WelcomeController(new WelcomeService())

/**
 * GET /login
 * Displays welcome page
 */
router.get('/', controller.showWelcomePage)

module.exports = router