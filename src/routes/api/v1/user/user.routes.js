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
 * CREATED DATE : April 04, 2026 08:21 AM
 * ------------------------------------------------------------------------
 */

const express = require('express')
const router = express.Router()

const userController = require('../../../../controllers/api/user/user.controller')

router.get('/',     userController.getUsers)
router.get('/:id',  userController.getUserById)
router.post('/',    userController.createUser)

module.exports = router