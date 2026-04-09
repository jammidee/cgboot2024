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
 * CREATED DATE  : April 09, 2026 09:32 PM
 * npm run create:capp [name]
 * ------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const inputName = process.argv[2]; 
if (!inputName) {
    console.error("\x1b[31mError:\x1b[0m Provide a module name (e.g., node create-capp inventory)");
    process.exit(1);
}

const fileName = inputName.toLowerCase();
const className = inputName.charAt(0).toUpperCase() + inputName.slice(1);

const paths = {
    moduleDir: path.join(__dirname, `../modules/${fileName}`),
    viewDir: path.join(__dirname, `../views/module/${fileName}`),
    viewLayoutDir: path.join(__dirname, `../views/module/${fileName}/layout`),
    stubsDir: path.join(__dirname, `./stubs`)
};

// Ensure directories exist
[paths.moduleDir, paths.viewDir, paths.viewLayoutDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const generateFromStub = (stubName) => {
    const stubPath = path.join(paths.stubsDir, `${stubName}.stub`);
    if (!fs.existsSync(stubPath)) return "";
    
    let content = fs.readFileSync(stubPath, 'utf8');
    return content
        .replace(/{{fileName}}/g, fileName)
        .replace(/{{className}}/g, className);
};

const filesToCreate = [
    // Logic files (stay in modules)
    { 
        path: path.join(paths.moduleDir, `${fileName}.controller.js`), 
        content: `const ${className}Service = require('./${fileName}.service');\n\nexports.index = async (req, res) => {\n    res.render('module/${fileName}/index', { title: '${className}', user: req.user });\n};` 
    },
    { 
        path: path.join(paths.moduleDir, `${fileName}.service.js`), 
        content: `class ${className}Service {}\nmodule.exports = new ${className}Service();` 
    },
    { 
        path: path.join(paths.moduleDir, `${fileName}.routes.js`), 
        content: `const express = require('express');\nconst router = express.Router();\nconst ctrl = require('./${fileName}.controller');\n\nrouter.get('/', ctrl.index);\n\nmodule.exports = router;` 
    },

    // View files (go to views/module/)
    { path: path.join(paths.viewDir, `index.pug`), content: generateFromStub('index') },
    { path: path.join(paths.viewLayoutDir, `laSideBar.pug`), content: generateFromStub('laSideBar') },
    { path: path.join(paths.viewLayoutDir, `laRightBar.pug`), content: generateFromStub('laRightBar') }
];

filesToCreate.forEach(file => {
    if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content.trim());
        console.log(`\x1b[32mCREATED:\x1b[0m ${file.path}`);
    }
});