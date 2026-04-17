/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 * * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 15, 2026 12:45 AM
 * ------------------------------------------------------------------------
 */

const { Queue } = require('bullmq');
const redisConfig = { connection: { host: "127.0.0.1", port: 6379 } };

class TmplBackground {
    constructor(service) {
        this.service = service;
        this.queue = new Queue('tmpl-queue', redisConfig);
    }

    /**
     * Start the recurring background jobs
     */
    async init() {
        console.log('[System] Initializing Tmpl Background Queue...');

        // Add a repeatable job (Cron style)
        // This runs every 15 minutes
        await this.queue.add('cleanup-task', { action: 'start' }, {
            repeat: {
                pattern: '*/15 * * * *' 
            }
        });
    }
}

module.exports = TmplBackground;