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
const controller            = new DashboardController();

//------------------------------------------------------------------
// This make sure that user is authenticated when access this page.
// If not authenticated, redirect to login page.
//------------------------------------------------------------------
const AuthMiddleware        = require('../../../middlewares/auth.middleware');

//------------------------------------------------------------------
// Control Access, this makes sure that access this page
// requires 'dashboard_access'
//------------------------------------------------------------------
const { authorize }         = require('../../../helpers/access.helper');

/**
 * GET /dashboard
 */
router.get('/', AuthMiddleware.ensureAuthenticated, authorize('dashboard_access'), controller.index );

module.exports = router;
