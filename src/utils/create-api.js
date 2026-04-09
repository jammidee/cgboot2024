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
 * CREATED DATE  : April 09, 2026 08:52 PM
 * npm run create:api [name]
 * ------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

// Get the name from command line
const inputName = process.argv[2]; 

if (!inputName) {
    console.error("\x1b[31mError:\x1b[0m Please provide a name (e.g., node create-api UserProfile)");
    process.exit(1);
}

// Formatting
const fileName = inputName.toLowerCase();
const className = inputName.charAt(0).toUpperCase() + inputName.slice(1);

// Dynamic Date Generator
const now = new Date();
const formattedDate = now.toLocaleString('en-US', { 
    month: 'long', 
    day: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
}).replace(',', '');

// The Dynamic Header Template
const header = `/**
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
 * CREATED DATE  : ${formattedDate}
 * ------------------------------------------------------------------------
 */\n`;

const folders = {
    models: path.join(__dirname, '../models/api'),
    services: path.join(__dirname, '../services/api'),
    controllers: path.join(__dirname, '../controllers/api/v1')
};

// Ensure directories exist
Object.values(folders).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const templates = {
    model: header + `
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ${className} = sequelize.define('${className}', {
    // Define attributes here
    name: { type: DataTypes.STRING }
}, {
    tableName: '${fileName}s',
    timestamps: true
});

module.exports = ${className};`,

    service: header + `
const ${className} = require('../../models/api/${fileName}.model');

class ${className}Service {
    async findAll() {
        return await ${className}.findAll();
    }
}

module.exports = new ${className}Service();`,

    controller: header + `
const ${className}Service = require('../../../services/api/${fileName}.service');

exports.index = async (req, res) => {
    try {
        const data = await ${className}Service.findAll();
        return res.apiSuccess(data, "${className} retrieved successfully");
    } catch (error) {
        return res.apiError(error.message);
    }
};`
};

// Execute File Creation
const filesToCreate = [
    { path: path.join(folders.models, `${fileName}.model.js`), content: templates.model },
    { path: path.join(folders.services, `${fileName}.service.js`), content: templates.service },
    { path: path.join(folders.controllers, `${fileName}.controller.js`), content: templates.controller }
];

filesToCreate.forEach(file => {
    if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content.trim());
        console.log(`\x1b[32mCREATED:\x1b[0m ${file.path}`);
    } else {
        console.log(`\x1b[33mEXISTS:\x1b[0m ${file.path}`);
    }
});

// At the very end of your create-api.js script:

console.log(`
\x1b[36m---------------------------------------------------------
API GENERATION SUCCESSFUL
---------------------------------------------------------\x1b[0m
To activate your new API, add these lines to \x1b[1mapp.js\x1b[0m:

\x1b[33m// 1. Import the controller\x1b[0m
const ${inputName}Controller = require('./src/controllers/api/v1/${fileName}.controller');

\x1b[33m// 2. Register the route\x1b[0m
app.get('/api/v1/${fileName}', ${inputName}Controller.index);

\x1b[36m---------------------------------------------------------\x1b[0m
`);