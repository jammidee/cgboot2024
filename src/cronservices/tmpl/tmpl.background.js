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
 * CREATED DATE : June 02, 2026 02:55 AM
 * ------------------------------------------------------------------------
 */

// Step out of tmpl (..), out of cronservices (..), into config/db.js
const dbPool = require('../../config/db.js'); 

class TmplBackground {
    constructor(service) {
        this.service = service;
        this.queueName = 'tmpl_tasks';
    }

    async init() {
        console.log('[System] Initializing Tmpl Native MySQL Scheduler...');

        // Heartbeat task: run every 15 minutes
        setInterval(async () => {
            try {
                const payload = JSON.stringify({ action: 'CLEANUP_EXPIRED_TOKENS', triggeredAt: new Date() });

                await dbPool.query(
                    'INSERT INTO bgndjobs (queue_name, payload) VALUES (?, ?)', 
                    [this.queueName, payload]
                );

                console.info('[Scheduler] Enqueued new maintenance task into MySQL.');
            } catch (err) {
                console.error('[Scheduler Error] Failing to write job to database:', err.message);
            }
        }, 900000); 
    }
}

module.exports = TmplBackground;