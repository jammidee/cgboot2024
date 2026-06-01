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
 * CREATED DATE : June 02, 2026 03:05 AM
 * ------------------------------------------------------------------------
 */

const dbPool = require('../../config/db.js'); 
const { QueryTypes } = require('sequelize');

class TmplWorker {
    constructor(service) {
        this.service = service;
        this.queueName = 'tmpl_tasks';
        this.isPolling = false;
    }

    start() {
        console.log('[Worker] Tmpl Native MySQL Worker Polling Initiated...');

        setInterval(async () => {
            if (this.isPolling) return; 
            this.isPolling = true;

            try {
                // 1. Fetch the oldest pending row safely while avoiding locked rows
                // Using Sequelize named replacements (:queueName) to fix the syntax error
                const rows = await dbPool.query(`
                    SELECT id, payload, attempts 
                    FROM bgndjobs 
                    WHERE queue_name = :queueName AND status = 'pending' 
                    ORDER BY id ASC 
                    LIMIT 1 
                    FOR UPDATE SKIP LOCKED
                `, {
                    replacements: { queueName: this.queueName },
                    type: QueryTypes.SELECT
                });

                if (!rows || rows.length === 0) {
                    this.isPolling = false;
                    return; 
                }

                const currentJob = rows[0];

                // 2. Lock ownership immediately by updating status to processing
                await dbPool.query(`
                    UPDATE bgndjobs 
                    SET status = 'processing', attempts = attempts + 1 
                    WHERE id = :id
                `, {
                    replacements: { id: currentJob.id },
                    type: QueryTypes.UPDATE
                });

                console.log(`[Worker] Processing Job ID: ${currentJob.id}`);

                // 3. Execute your business logic when ready
                // const jobPayload = JSON.parse(currentJob.payload);
                // await this.service.executeTask(jobPayload);

                // 4. Mark job as complete
                await dbPool.query(`
                    UPDATE bgndjobs 
                    SET status = 'completed' 
                    WHERE id = :id
                `, {
                    replacements: { id: currentJob.id },
                    type: QueryTypes.UPDATE
                });

                console.log(`[Worker] Job ID ${currentJob.id} finished successfully.`);

            } catch (err) {
                console.error('[Worker Fatal Error]:', err.message);
            } finally {
                this.isPolling = false; 
            }
        }, 5000);
    }
}

module.exports = TmplWorker;