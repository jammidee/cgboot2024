/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 15, 2026 01:24 AM
 * ------------------------------------------------------------------------
 */

const express               = require('express');
const router                = express.Router();

const AccessController      = require('../../controllers/systems/access_denied.controller');
const AuthMiddleware        = require('../../middlewares/auth.middleware');

//Control Acess
const { authorize }         = require('../../helpers/access.helper');

const controller            = new AccessController();

/**
 * GET /dashboard
 */
router.get('/', AuthMiddleware.ensureAuthenticated, controller.index );


module.exports = router;
