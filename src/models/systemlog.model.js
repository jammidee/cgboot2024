/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * CREATED DATE : March 28, 2026, 10:54 PM
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db');

const SystemLog     = sequelize.define('SystemLog', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  entityid: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '_NA_',
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  action_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  action_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  user_agent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  severity: {
    type: DataTypes.ENUM('INFO', 'WARNING', 'ERROR'),
    allowNull: true,
    defaultValue: 'INFO',
  },

  is_suspicious: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  sstatus: {
    type: DataTypes.STRING(36),
    allowNull: true,
    defaultValue: 'ACTIVE',
  },

  pid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  deleted: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  }

}, {
  tableName: 'system_logs',

  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false, // table does not have updated_at

  paranoid: false // you are using manual `deleted` flag instead
});

module.exports = SystemLog;