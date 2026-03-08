/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : CloudGate PHP Framework
 * CREATED DATE : March 08, 2026 08:20 AM
 * ------------------------------------------------------------------------
 */

class WelcomeController {

  /**
   * Render Login Page
   * Uses Pug template from /views/login/index.pug
   */
  showWelcomePage = async (req, res) => {

    res.render('welcome/index', {
      error: null
    })
  }

}

module.exports = WelcomeController