/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : June 06, 2026 12:54 AM
 * ------------------------------------------------------------------------
 */

// utils/userRecentActivity.js

const db = require('../config/db'); // your mysql connection

/**
 * Tracks and upserts user recent activity for modules. Keeps a maximum of 10 records per user.
 * * @param {string} userId - The unique identifier of the user
 * @param {string} moduleId - The unique identifier of the module being accessed
 * @param {string} moduleName - The human-readable name of the module
 */
const userRecentActivity = async (userId, moduleId, moduleName) => {
  try {

    // 1. Perform an Upsert operation using raw MySQL syntax
    const upsertQuery = `
      INSERT INTO user_recent_activity (user_id, module_id, module_name, last_accessed, access_count)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, 1)
      ON DUPLICATE KEY UPDATE
        module_name = VALUES(module_name),
        last_accessed = CURRENT_TIMESTAMP,
        access_count = access_count + 1
    `;

    await db.query(upsertQuery, {
      replacements: [userId, moduleId, moduleName]
    });

    // 2. Trim recent activity records list to keep only the top 10 rows per user
    // MySQL requires a subquery wrapper workaround if you read and write to the same table during a delete.
    const trimQuery = `
      DELETE FROM user_recent_activity
      WHERE user_id = ?
      AND module_id NOT IN (
        SELECT module_id FROM (
          SELECT module_id FROM user_recent_activity
          WHERE user_id = ?
          ORDER BY last_accessed DESC
          LIMIT 10
        ) AS temp_table
      )
    `;

    //Comment to avoid trimming, keep user access history
    // await db.query(trimQuery, {
    //   replacements: [userId, userId]
    // });

  } catch (err) {

    // Standard safety fallback: We log the error but don't disrupt core thread executions
    console.error('CRITICAL: userRecentActivity tracking failed:', err.message);

  }
};

module.exports = userRecentActivity;