/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : CloudGate PHP Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
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
 * GET /forgot 06/12/2026
 * Displays login page
 */
router.get('/forgot', controller.forgot)

/**
 * GET /forgot 06/12/2026
 * Displays login page
 */
router.get('/help', controller.help)

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