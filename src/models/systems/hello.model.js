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
 * CREATED DATE  : April 09, 2026 07:20 PM
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../../config/db'); // Path adjusted to your boilerplate tree

/**
 * Hello Model
 * Serves as the physical table schema for the Hello API template.
 */
const Hello = sequelize.define('Hello', {

  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    comment: 'Descriptive title for the hello record',
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'GENERAL',
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },

  entityid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'GCONE',
  },

  created_at: {
    type: DataTypes.DATE,
  },

  updated_at: {
    type: DataTypes.DATE,
  },

  deleted_at: {
    type: DataTypes.DATE,
  }

}, {
  tableName: 'hello_items',

  // Enable Sequelize timestamp handling
  timestamps: true,

  // Map to snake_case columns
  createdAt: 'created_at',
  updatedAt: 'updated_at',

  // Enable soft delete (paranoid mode)
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = Hello;