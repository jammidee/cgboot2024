/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR         : Jammi Dee (Joel M. Damaso)
 * LOCATION       : Manila, Philippines
 * EMAIL          : jammi_dee@yahoo.com
 * CREATED DATE   : April 09, 2026 09:32 PM
 * npm run create:capp [name]
 * ------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const inputName = process.argv[2];
if (!inputName) {
    console.error("\x1b[31mError:\x1b[0m Provide a module name (e.g., npm run create:capp inventory)");
    process.exit(1);
}

const fileName = inputName.toLowerCase();
const className = inputName.charAt(0).toUpperCase() + inputName.slice(1);

// --- Dynamic Date & Header Generator ---
const now = new Date();
const formattedDate = now.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
}).replace(',', '');

const headerJS = `/**
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
 * CREATED DATE : ${formattedDate}
 * ------------------------------------------------------------------------
 */\n`;

const headerPug = `//-
    ------------------------------------------------------------------------
    Copyright (C) 2025 Lalulla OPC. All rights reserved.
    
    Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
    This file is part of the Lalulla System.
    
    ------------------------------------------------------------------------
    PRODUCT NAME : Lalulla Nodejs Framework
    AUTHOR       : Jammi Dee (Joel M. Damaso)
    CREATED DATE : ${formattedDate}
    ------------------------------------------------------------------------
\n`;

const paths = {
    moduleDir: path.join(__dirname, `../modules/${fileName}`),
    viewDir: path.join(__dirname, `../../views/modules/${fileName}`),
    viewLayoutDir: path.join(__dirname, `../../views/modules/${fileName}/layout`),
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
    return headerPug + content
        .replace(/{{fileName}}/g, fileName)
        .replace(/{{className}}/g, className);
};

const filesToCreate = [
    // --- ROUTE FILE ---
    { 
        path: path.join(paths.moduleDir, `${fileName}.routes.js`), 
        content: headerJS + `
const express = require('express');
const router = express.Router();

const ${className}Controller = require('./${fileName}.controller');
const ${className}Service    = require('./${fileName}.service');

const controller = new ${className}Controller(new ${className}Service());

const AuthMiddleware = require('../../middlewares/auth.middleware');
const { authorize }  = require('../../helpers/access.helper');

/**
 * GET /${fileName}
 */
router.get('/',           AuthMiddleware.ensureAuthenticated, authorize('${fileName}_access'), controller.showIndex);
router.get('/singlepage', AuthMiddleware.ensureAuthenticated, authorize('${fileName}_access'), controller.showSinglePage);

module.exports = router;`
    },

    // --- CONTROLLER FILE ---
    { 
        path: path.join(paths.moduleDir, `${fileName}.controller.js`), 
        content: headerJS + `
const { can } = require('../../helpers/access.helper');

class ${className}Controller {
  constructor(${fileName}Service) {
    this.${fileName}Service = ${fileName}Service;
  }

  showIndex = async (req, res) => {
    if (!can('${fileName}_access', req.user)) {
        return res.status(403).send('Access Denied');
    }

    res.render('./modules/${fileName}/index', { 
        title: '${className} Index', 
        can, 
        now: new Date(), 
        error: null,
        user: req.user 
    });
  };

  showSinglePage = async (req, res) => {
    if (!can('${fileName}_access', req.user)) {
        return res.status(403).send('Access Denied');
    }

    res.render('./modules/${fileName}/singlepage', { 
        title: '${className} Single Page', 
        can, 
        now: new Date(), 
        error: null,
        user: req.user 
    });
  };
}

module.exports = ${className}Controller;`
    },

    // --- SERVICE FILE ---
    { 
        path: path.join(paths.moduleDir, `${fileName}.service.js`), 
        content: headerJS + `
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

/**
 * ${className}Service
 * Handles business logic.
 */
class ${className}Service {
  async authenticate(username, password) {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Invalid username or password');
    }

    return user;
  }
}

module.exports = ${className}Service;` 
    },

    // --- VIEW FILES ---
    { path: path.join(paths.viewDir,        `index.pug`),       content: generateFromStub('index') },
    { path: path.join(paths.viewDir,        `singlepage.pug`),  content: generateFromStub('singlepage') },
    { path: path.join(paths.viewLayoutDir,  `laSideBar.pug`),   content: generateFromStub('laSideBar') },
    { path: path.join(paths.viewLayoutDir,  `laRightBar.pug`),  content: generateFromStub('laRightBar') }
];

// Execute File Creation
filesToCreate.forEach(file => {
    if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content.trim());
        console.log(`\x1b[32mCREATED:\x1b[0m ${file.path}`);
    } else {
        console.log(`\x1b[33mEXISTS:\x1b[0m ${file.path}`);
    }
});

console.log(`\n\x1b[32mSuccess:\x1b[0m Module with View structure for "${className}" is ready.`);
console.log(`\x1b[36m------------------------------------------------------------\x1b[0m`);
console.log(`\x1b[1mNEXT STEP:\x1b[0m Please register the module in your \x1b[33mapp.js\x1b[0m:`);
console.log(`\x1b[35mapp.use('/module/${fileName}', require('./src/modules/${fileName}/${fileName}.routes'));\x1b[0m`);
console.log(`\x1b[36m------------------------------------------------------------\x1b[0m`);