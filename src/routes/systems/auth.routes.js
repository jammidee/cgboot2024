/**
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const express           = require('express');
const router            = express.Router();

const AuthController    = require('../../controllers/systems/auth.controller');
const AuthService       = require('../../services/systems/auth.service');

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
router.post('/login', controller.login)

/**
 * POST /login/logout
 */
router.get('/logout', controller.logout)

module.exports = router