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

class AuthMiddleware {

  static ensureAuthenticated(req, res, next) {

    if (req.session.logged_in || (req.session.auth && req.session.auth.logged_in)) {

      return next();

    }

    return res.redirect('/auth/login');

  }

}

module.exports = AuthMiddleware;