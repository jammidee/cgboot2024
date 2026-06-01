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

const fs    = require('fs');
const path  = require('path');

module.exports = () => {
    const modulesPath = path.join(__dirname, '../cronservices');

    fs.readdirSync(modulesPath).forEach((folder) => {
        const folderPath            = path.join(modulesPath, folder);

        const serviceFile           = path.join(folderPath, `${folder}.service.js`);
        const bgFile                = path.join(folderPath, `${folder}.background.js`);
        const workerFile            = path.join(folderPath, `${folder}.worker.js`);

        if (fs.existsSync(bgFile) && fs.existsSync(workerFile)) {
            const ServiceClass      = require(serviceFile);
            const BackgroundClass   = require(bgFile);
            const WorkerClass       = require(workerFile);

            // Initialize Service Dependency
            const serviceInstance = new ServiceClass();

            // 1. Initialize Producer (Sets up the queue/cron)
            const bgProducer = new BackgroundClass(serviceInstance);
            bgProducer.init();

            // 2. Initialize Worker (Consumes the queue)
            const bgWorker = new WorkerClass(serviceInstance);
            bgWorker.start();

            console.info(`[System] Pure Background Service & Worker Loaded: ${folder}`);
        }
    });
};