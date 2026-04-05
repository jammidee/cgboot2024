/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 04, 2026 07:25 PM
 * ------------------------------------------------------------------------
 */

const Config = require('../../models/configdb.model')

/**
 * ConfigService
 * Handles configuration database logic only.
 * No HTTP logic here.
 * System-level service (cross-module usage).
 */
class ConfigService {

  /**
   * ----------------------------------------------------------
   * Get configuration value
   *
   * @param {String} key
   * @param {Object} options
   *    - entityid (default '_NA_')
   *    - defaultValue (optional fallback value)
   *    - autoCreate (boolean - auto insert if not found)
   * ----------------------------------------------------------
   */
  async get(key, options = {}) {

    const {
      entityid = '_NA_',
      defaultValue = null,
      autoCreate = false
    } = options

    // ----------------------------------------------------------
    // Fetch active & non-deleted record
    // ----------------------------------------------------------
    const record = await Config.findOne({
      where: {
        var_key: key,
        entityid,
        status: 'active',
        deleted: 0
      }
    })

    if (record) {
      return this._parseValue(record.var_value, record.var_type)
    }

    // ----------------------------------------------------------
    // Added Logic:
    // If not found and defaultValue is provided
    // ----------------------------------------------------------
    if (defaultValue !== null) {

      if (autoCreate) {
        await this.set(key, defaultValue, {
          entityid,
          description: 'Auto-created default value',
          var_type: typeof defaultValue
        })
      }

      return defaultValue
    }

    return null
  }

  /**
   * ----------------------------------------------------------
   * Set or update configuration value
   *
   * @param {String} key
   * @param {Any} value
   * @param {Object} options
   *    - entityid
   *    - description
   *    - var_type
   *    - userid
   * ----------------------------------------------------------
   */
  async set(key, value, options = {}) {

    const {
      entityid = '_NA_',
      description = null,
      var_type = typeof value,
      userid = 0
    } = options

    // ----------------------------------------------------------
    // Check if existing record
    // ----------------------------------------------------------
    const existing = await Config.findOne({
      where: { var_key: key, entityid }
    })

    if (existing) {

      existing.var_value   = this._stringifyValue(value)
      existing.var_type    = var_type
      existing.description = description
      existing.updated_by  = userid

      await existing.save()
      return existing
    }

    // ----------------------------------------------------------
    // Create new configuration
    // ----------------------------------------------------------
    const newConfig = await Config.create({
      entityid,
      var_key: key,
      var_value: this._stringifyValue(value),
      var_type,
      description,
      userid,
      created_by: userid
    })

    return newConfig
  }

  /**
   * Soft delete configuration
   */
  async delete(key, entityid = '_NA_') {

    const record = await Config.findOne({
      where: { var_key: key, entityid }
    })

    if (!record) {
      throw new Error('Configuration not found')
    }

    record.deleted = 1
    record.status  = 'archived'

    await record.save()

    return true
  }

  /**
   * ----------------------------------------------------------
   * Private: Convert DB string to correct type
   * ----------------------------------------------------------
   */
  _parseValue(value, type) {

    switch (type) {

      case 'int':
      case 'number':
        return parseInt(value)

      case 'float':
        return parseFloat(value)

      case 'bool':
      case 'boolean':
        return value === 'true' || value === true

      case 'json':
      case 'object':
        try {
          return JSON.parse(value)
        } catch (e) {
          return null
        }

      default:
        return value
    }
  }

  /**
   * ----------------------------------------------------------
   * Private: Convert value to storable string
   * ----------------------------------------------------------
   */
  _stringifyValue(value) {

    if (typeof value === 'object') {
      return JSON.stringify(value)
    }

    return String(value)
  }

}

module.exports = ConfigService