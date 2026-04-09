/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR        : Jammi Dee (Joel M. Damaso)
 * LOCATION      : Manila, Philippines
 * EMAIL         : jammi_dee@yahoo.com
 * CREATED DATE  : April 09, 2026 07:15 PM
 * ------------------------------------------------------------------------
 */

class HelloController {
  constructor(HelloService) {
    this.helloService = HelloService;
  }

  /**
   * Handle Resource Creation
   */
  create = async (req, res) => {
    try {
      const result = await this.helloService.createResource(req.body);
      return res.status(201).json({ success: true, data: result });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  /**
   * Retrieve all resources (Simulated)
   */
  getAll = async (req, res) => {
    try {
      const results = await this.helloService.fetchAll();
      return res.json({ success: true, count: results.length, data: results });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  /**
   * Retrieve a single resource by ID
   */
  getById = async (req, res) => {
    try {
      const result = await this.helloService.fetchById(req.params.id);
      return res.json({ success: true, data: result });
    } catch (err) {
      return res.status(404).json({ success: false, message: err.message });
    }
  };

  /**
   * Update resource
   */
  update = async (req, res) => {
    try {
      const result = await this.helloService.updateResource(req.params.id, req.body);
      return res.json({ success: true, data: result });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  /**
   * Delete resource
   */
  delete = async (req, res) => {
    try {
      await this.helloService.removeResource(req.params.id);
      return res.json({ success: true, message: 'Resource deleted successfully' });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };
}

module.exports = HelloController;