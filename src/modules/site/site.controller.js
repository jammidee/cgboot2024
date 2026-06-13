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
 * CREATED DATE : March 08, 2026 08:20 AM
 * ------------------------------------------------------------------------
 */

const { isLogged } = require('../../helpers/auth.helper');

class SiteController {

  /**
   * Render Site Page
   * Uses Pug template from /views/site/index.pug
   */
  showSitePage = async (req, res) => {

    if (isLogged(req)) {

      return res.redirect('/dashboard?t==' + Date.now() );

    }

    res.render('systems/site/index', {
      error: null
    });

  }

  /**
   * Display the Fullflyer Page
   */
  showFullFlyerPage = async (req, res) => {

    res.render('systems/site/fullflyer', {
      error: null
    })
  };

  /**
   * Display the features Page
   */
  features = async (req, res) => {

    res.render('systems/site/features', {
      error: null
    })
  };

  /**
   * Display the calendar Page
   */
  calendar = async (req, res) => {

    res.render('systems/site/calendar', {
      error: null
    })
  };

  /**
   * Display the map Page
   */
  map = async (req, res) => {

    res.render('systems/site/map', {
      error: null
    })
  };

  /**
   * Display the datatable Page
   */
  datatable = async (req, res) => {

    res.render('systems/site/datatable', {
      error: null
    })
  };


}

module.exports = SiteController