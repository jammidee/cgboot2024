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
 * CREATED DATE  : April 09, 2026 10:05 PM
 * ------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    const modulesPath = path.join(__dirname, '../src/modules');

    // Folders in this list will NOT be registered as routes
    const excludedFolders = ['site', 'tmpl', 'user', 'welcome', '_common', 'shared', 'utils', 'base'];

    fs.readdirSync(modulesPath).forEach((folder) => {
        // 1. Skip if the folder is in the exclusion list
        if (excludedFolders.includes(folder)) return;

        // 2. Skip if it's a hidden folder (starts with a dot)
        if (folder.startsWith('.')) return;

        const routePath = path.join(modulesPath, folder, `${folder}.routes.js`);

        // 3. Only register if the .routes.js file exists
        if (fs.existsSync(routePath)) {
            try {
                app.use(`/${folder}`, require(routePath));
                console.log(`\x1b[32m[ROUTING]\x1b[0m Registered: /${folder}`);
            } catch (err) {
                console.error(`\x1b[31m[ERROR]\x1b[0m Failed to load module '${folder}':`, err.message);
            }
        }
    });
};