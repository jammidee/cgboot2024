/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla NodeJS Framework
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

class AuthController {

  constructor(AuthService) {
    this.authService = AuthService;
  }

  /**
   * Render Login Page
   * Uses Pug template from /views/login/index.pug
   */
  showLoginPage = async (req, res) => {

    res.render('systems/auth/index', {
      error: null
    })
  }

  /**
   * Handle Login POST
   * - Calls service
   * - Creates session
   */
  login = async (req, res) => {

    const { username, password } = req.body

    try {

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
  logout = async (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login')
    })
  }
}

module.exports = AuthController