/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 * 
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 18, 2026 12:29 AM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const TmplController = require('./tmpl.controller')
const TmplService    = require('./tmpl.service')

const controller = new TmplController(new TmplService());

//------------------------------------------------------------------
// This make sure that user is authenticated when access this page.
// If not authenticated, redirect to login page.
//------------------------------------------------------------------
const AuthMiddleware        = require('../../middlewares/auth.middleware');

//------------------------------------------------------------------
// Control Access, this makes sure that access this page
// requires 'dashboard_access'
//------------------------------------------------------------------
const { authorize }         = require('../../helpers/access.helper');

/**
 * GET /site
 * Displays site page
 */
router.get('/',             AuthMiddleware.ensureAuthenticated, authorize('template_access'), controller.showIndex);
router.get('/singlepage',   AuthMiddleware.ensureAuthenticated, authorize('template_access'), controller.showSinglePage);

module.exports = router