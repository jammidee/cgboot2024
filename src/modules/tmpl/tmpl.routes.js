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

const controller = new TmplController(new TmplService())

/**
 * GET /site
 * Displays site page
 */
router.get('/',                 controller.showSitePage);

module.exports = router