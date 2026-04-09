/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * CREATED DATE : April 08, 2026 12:20 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const express = require('express');
const router  = express.Router();

const ConfigController = require('../../../../controllers/api/v1/systems/config.controller');
const ConfigService    = require('../../../../services/api/v1/systems/config.service');
const validateToken    = require('../../../../middlewares/jwt.middleware');

/**
 * Instantiate controller with injected service
 * (Keeps consistency with Auth route structure)
 */
const service    = new ConfigService();
const controller = new ConfigController(service);

/**
 * ------------------------------------------------------------------------
 * Config Routes (Protected by JWT)
 * Base Path: /api/v1/systems/config
 * ------------------------------------------------------------------------
 */

/**
 * GET /api/v1/systems/config/:key
 * Retrieve configuration value
 */
router.get('/:key', validateToken, controller.get);

/**
 * POST /api/v1/systems/config
 * Create or update configuration
 */
router.post('/', validateToken, controller.set);

/**
 * DELETE /api/v1/systems/config/:key
 * Soft delete configuration
 */
router.delete('/:key', validateToken, controller.delete);

module.exports = router;