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

const { can }         = require('../../helpers/access.helper');

class TmplController {

  /**
   * Render Site Page
   * Dusplay the Template Index Page
   */
  showIndex = async (req, res) => {

    if (!can('template_access', req.user)) {
        return res.status(403).send('Access Denied')
    }

    res.render('./modules/tmpl/index', { title: 'Template Index', can, now: new Date(), error: null, activePage: 'template' });

  };

  /**
   * Display the Template Single Page
   */
  showSinglePage = async (req, res) => {

    if (!can('template_access', req.user)) {
        return res.status(403).send('Access Denied')
    }

    res.render('./modules/tmpl/singlepage', { title: 'Template Single Page', can, now: new Date(), error: null });

  };


}

module.exports = TmplController