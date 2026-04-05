/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 04, 2026 07:45 AM
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize')
const sequelize     = require('../../config/db')

const ConfigDb = sequelize.define('ConfigDb', {

  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  entityid: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '_NA_',
    comment: 'Multi-tenant entity identifier'
  },

  appid: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Application identifier (optional multi-app support)'
  },

  var_key: {
    type: DataTypes.STRING(150),
    allowNull: false,
    comment: 'Configuration key name'
  },

  var_value: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Stored value (stringified if object)'
  },

  var_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Data type (string, number, boolean, json, etc)'
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Configuration description or remarks'
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'active',
    comment: 'active, inactive, archived'
  },

  sstatus: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Secondary status (optional)'
  },

  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '0=Active, 1=Deleted (legacy support flag)'
  },

  userid: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: 'Owner user ID'
  },

  created_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },

  updated_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
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
  tableName: 'configdb',

  // Enable Sequelize timestamp handling
  timestamps: true,

  // Map to snake_case columns
  createdAt: 'created_at',
  updatedAt: 'updated_at',

  // Enable soft delete
  paranoid: true,
  deletedAt: 'deleted_at',

  indexes: [
    { fields: ['var_key'] },
    { fields: ['entityid'] },
    { fields: ['status'] },
    { fields: ['appid'] },
    { fields: ['deleted'] },
    { fields: ['sstatus'] }
  ]
})

module.exports = ConfigDb