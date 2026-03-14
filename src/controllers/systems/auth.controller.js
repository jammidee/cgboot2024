/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla NodeJS Framework
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const crypto          = require('crypto');
const config          = require('../../config/app.config');
const logAction       = require('../../utils/logAction');
const { isLogged }    = require('../../helpers/auth');


class AuthController {

  constructor(AuthService) {
    this.authService = AuthService;
  }

  /**
   * Render Login Page
   * Uses Pug template from /views/login/index.pug
   */
  showLoginPage = async (req, res) => {

    // Just redirect to secured page because we are
    // still authenticated.
    if (isLogged(req)) {

      return res.redirect('/dashboard');

    }

    // Get redirect URL from query parameter
    // (e.g., /auth/login?redirect=/dashboard)
    const redirectUrl = req.query.redirect || '';

    res.render('systems/auth/index', {
        error: null,
        redirect_url: redirectUrl  // pass to the view
    });

  }

  /**
   * Handle Login POST
   * - Calls service
   * - Creates session
   */
  login = async (req, res) => {

    const { username, password, redirect_url } = req.body

    try {

      // -------------------------------------------------
      // 1️⃣ Check SUPERADMINS from config first
      // -------------------------------------------------

      const hashedInput = crypto.createHash('md5').update(password).digest('hex');

      // 03/14/2026 Get the matching data in the config.
      const superadmin = config.superadmins.find(admin =>admin.email === username && admin.password === hashedInput);

      if (superadmin) {

        req.session.user = {
          id: 'SUPERADMIN', username: superadmin.email, role: 'SUPERADMIN'
        }

        // ✅ Set Lalulla-style session data
        req.session.user_id     = 0;
        req.session.user_name   = 'Superadmin';
        req.session.user_email  = superadmin.email;
        req.session.user_role   = 'Superadmin';
        req.session.user_entity = config.appentity;
        req.session.user_appid  = config.appid;
        req.session.logged_in   = true;

        // Optional: update your main app session flag
        if (req.session.app) {
          req.session.app.logged = 'YES';
        }

        // Redirect back if redirect_url exists
        if (redirect_url) {
            return res.redirect(redirect_url);
        }

        return res.redirect('/dashboard');

      }

      // -------------------------------------------------
      // 2️⃣ Otherwise check database
      // -------------------------------------------------


      const user = await this.loginService.authenticate(username, password)

      // Store minimal session info
      req.session.user = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        store_id: user.store_id
      }

      // Redirect after successful login
      res.redirect('/dashboard')

    } catch (err) {

      console.log(`There is an error --------> ${err}.`);
      res.redirect('/auth/login')

      // Re-render login page with error message
      // res.render('systems/auth/login', {
      //   error: err.message
      // })

    }
  }

  /**
   * Logout
   */
  // logout = async (req, res) => {
  //   req.session.destroy(() => {
  //     res.redirect('/auth/login')
  //   })
  // }

logout = async (req, res) => {

  try {
    await logAction( req,'logout', 'User logged out', 'INFO', false );
  } catch (err) {
    console.error(err);
  }

  req.session.destroy((err) => {

    if (err) {
      console.error('Session destroy error:', err);
    }

    res.clearCookie('connect.sid');
    res.redirect('/?t=' + Date.now());

  });

};



}

module.exports = AuthController