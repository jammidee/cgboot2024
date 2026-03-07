/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const WelcomeController = require('./welcome.controller')
const WelcomeService = require('./welcome.service')

const controller = new WelcomeController(new WelcomeService())

/**
 * GET /login
 * Displays welcome page
 */
router.get('/', controller.showWelcomePage)

module.exports = router