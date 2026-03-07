/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : CloudGate PHP Framework
 * CREATED DATE : March 07, 2026 11:50 PM
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