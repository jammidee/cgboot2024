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

const { Worker } = require('bullmq');
const redisConfig = { connection: { host: "127.0.0.1", port: 6379 } };

class TmplWorker {
    constructor(service) {
        this.service = service;
    }

    start() {
        const worker = new Worker('tmpl-queue', async (job) => {
            console.log(`[Worker] Processing job ${job.id} for Tmpl...`);
            
            // Execute business logic from your service
            // e.g., await this.service.doSomethingBackgroundRelated();
            
        }, redisConfig);

        worker.on('completed', job => {
            console.log(`[Worker] Job ${job.id} has completed!`);
        });

        worker.on('failed', (job, err) => {
            console.error(`[Worker] Job ${job.id} failed: ${err.message}`);
        });
    }
}

module.exports = TmplWorker;