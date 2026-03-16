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

// const { isLogged } = require('../../../helpers/auth.helper');
const { can }         = require('../../../helpers/access.helper');

class DashboardController {

  index = async (req, res) => {

    // if (!isLogged(req)) {
    //   // Not logged in, redirect to login with last URL as redirect
    //   const redirectUrl = encodeURIComponent(req.originalUrl);
    //   return res.redirect('/auth/login?redirect=' + redirectUrl);
    // }

    if (!can('dashboard_access', req.user)) {
        return res.status(403).send('Access Denied')
    }

    //------------------------------------------------------------------------------
    // 'can' is passed as a function to check user access. 'can' is declared in the
    // app.js
    // The pug is found in the application folder 'view'.
    //------------------------------------------------------------------------------
    res.render('capp/dashboard/index', { title: 'Dashboard', can, now: new Date() });

  }

}

module.exports = DashboardController;