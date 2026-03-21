/**
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 08, 2026 08:20 AM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const SiteController = require('./site.controller')
const SiteService    = require('./site.service')

const controller            = new SiteController(new SiteService())
// const AuthMiddleware        = require('../../middlewares/auth.middleware');
/**
 * GET /site
 * Displays site page
 */
router.get('/',                 controller.showSitePage);
router.get('/fullflyer',        controller.showFullFlyerPage)

module.exports = router