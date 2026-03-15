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

const { isLogged }      = require('../../helpers/auth');
const { can }           = require('../../helpers/access.helper');

class DashboardController {

  index = async (req, res) => {

    if (!isLogged(req)) {
      // Not logged in, redirect to login with last URL as redirect
      const redirectUrl = encodeURIComponent(req.originalUrl);
      return res.redirect('/auth/login?redirect=' + redirectUrl);
    }

    res.render('systems/error/access_denied', { title: 'Access Denied', user: req.session.user_name || 'User', email: req.session.user_email || '',
      can, now: new Date(),
    });

  }

}

module.exports = DashboardController;