/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR        : Jammi Dee (Joel M. Damaso)
 * LOCATION      : Manila, Philippines
 * EMAIL         : jammi_dee@yahoo.com
 * CREATED DATE  : April 09, 2026 07:15 PM
 * ------------------------------------------------------------------------
 */

const express = require('express');
const router = express.Router();

const HelloController = require('../../../../controllers/api/v1/hello/hello.controller');
const HelloService = require('../../../../services/api/v1/hello/hello.service');
const validateToken = require('../../../../middlewares/jwt.middleware');

// Initialize controller with injected service
const controller = new HelloController(new HelloService());

/**
 * CRUD Routes for Hello Template
 * Most routes are protected by validateToken middleware
 */

// Create - POST /api/v1/hello
router.post('/', validateToken, controller.create);

// Read All - GET /api/v1/hello
router.get('/', validateToken, controller.getAll);

// Read One - GET /api/v1/hello/:id
router.get('/:id', validateToken, controller.getById);

// Update - PUT /api/v1/hello/:id
router.put('/:id', validateToken, controller.update);

// Delete - DELETE /api/v1/hello/:id
router.delete('/:id', validateToken, controller.delete);

module.exports = router;