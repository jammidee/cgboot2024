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

/**
 * HelloService
 * Encapsulates business logic. Currently uses simulated data
 * to mimic the User model behavior.
 */
const Hello = require('../../../../models/systems/hello.model.mock');

class HelloService {

  async fetchAll() {
    return await Hello.findAll();
  }

  async fetchById(id) {
    const item = await Hello.findByPk(id);
    if (!item) throw new Error('Resource not found');
    return item;
  }

  async createResource(data) {
    return await Hello.create(data);
  }

  async updateResource(id, data) {
    const item = await Hello.findByPk(id);
    if (!item) throw new Error('Resource not found');
    return await item.update(data);
  }

  async removeResource(id) {
    const item = await Hello.findByPk(id);
    if (!item) throw new Error('Resource not found');
    // Performs soft-delete because paranoid: true is set in model
    return await item.destroy();
  }
}

module.exports = HelloService;