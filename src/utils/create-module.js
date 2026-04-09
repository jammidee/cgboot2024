
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
 * CREATED DATE  : April 09, 2026 08:46 PM
 * npm run create:module [name]
 * ------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const inputName = process.argv[2]; 

if (!inputName) {
    console.error("\x1b[31mError:\x1b[0m Please provide a module name (e.g., node create-module inventory)");
    process.exit(1);
}

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

// Define the module directory path
const moduleDir = path.join(__dirname, `../modules/${fileName}`);

// Ensure module directory exists
if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
}

const templates = {
    controller: header + `
const ${className}Service = require('./${fileName}.service');

exports.renderPage = async (req, res) => {
    try {
        const data = await ${className}Service.getData();
        res.render('${fileName}/index', { title: '${className}', data });
    } catch (error) {
        res.status(500).send(error.message);
    }
};`,

    service: header + `
// Add your specific model require here if needed
// const ${className} = require('../../models/${fileName}.model');

class ${className}Service {
    async getData() {
        return { message: "Welcome to the ${className} module" };
    }
}

module.exports = new ${className}Service();`,

    routes: header + `
const express = require('express');
const router = express.Router();
const ${className}Controller = require('./${fileName}.controller');

router.get('/', ${className}Controller.renderPage);

module.exports = router;`
};

// Execute File Creation
const filesToCreate = [
    { path: path.join(moduleDir, `${fileName}.controller.js`), content: templates.controller },
    { path: path.join(moduleDir, `${fileName}.service.js`), content: templates.service },
    { path: path.join(moduleDir, `${fileName}.routes.js`), content: templates.routes }
];

filesToCreate.forEach(file => {
    if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content.trim());
        console.log(`\x1b[32mMODULE COMPONENT CREATED:\x1b[0m ${file.path}`);
    } else {
        console.log(`\x1b[33mEXISTS:\x1b[0m ${file.path}`);
    }
});

console.log(`\n\x1b[36mNext Step:\x1b[0m Register the module in your main app.js or routes/index.js:`);
console.log(`app.use('/modules/${fileName}', require('./src/modules/${fileName}/${fileName}.routes'));`);