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
 * CREATED DATE : March 14, 2026 07:02 PM
 * ------------------------------------------------------------------------
 */

const express               = require('express');
const router                = express.Router();

const DashboardController   = require('../../../controllers/capp/dashboard/dashboard.controller');
const AuthMiddleware        = require('../../../middlewares/auth.middleware');

const controller            = new DashboardController();

/**
 * GET /dashboard
 */
router.get('/', AuthMiddleware.ensureAuthenticated, controller.index );


module.exports = router;
