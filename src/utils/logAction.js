/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla NodeJS Framework
 * CREATED DATE : March 15, 2026 12:52 AM
 * ------------------------------------------------------------------------
 */
// utils/logAction.js

const db = require('../config/db'); // your mysql connection

const logAction = async (
  req,
  actionType,
  actionDetails,
  severity = 'INFO',
  isSuspicious = false
) => {
  try {

    const userId   = req.session?.user_id ?? 0;
    const entityId = req.session?.user_entity ?? '_NA_';

    const logData = {
      entityid: entityId,
      user_id: userId,
      action_type: actionType,
      action_details: actionDetails,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      severity: severity,
      is_suspicious: isSuspicious ? 1 : 0,
      sstatus: 'ACTIVE',
      pid: 0,
      userid: userId,
      deleted: 0
    };

    await db.query('INSERT INTO system_logs SET ?', logData);

  } catch (err) {
    console.error('Error logging action:', err);
  }
};

module.exports = logAction;