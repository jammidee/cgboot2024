/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 05, 2026 07:25 PM
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 04, 2026 08:21 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const assert = require('assert');
const ConfigService = require('../../services/systems/config.service');

describe('ConfigService (Systems Module)', function () {

    /**
     * Test: Should read seeded APP_NAME
     */
    it('should read seeded APP_NAME', async function () {
        const value = await ConfigService.get('APP_NAME', 'DefaultApp');
        assert.ok(value); // must exist
    });

    /**
     * Test: Should return default value if key does not exist
     */
    it('should return default for unknown key', async function () {
    const value = await ConfigService.get('NON_EXISTENT_KEY', {
        defaultValue: 'DefaultValue',
        entityid: 'LALULLA'
    });
    assert.strictEqual(value, 'DefaultValue');
    });

    /**
     * Test: Should set and retrieve new configuration
     */
    it('should set and get a new key', async function () {
        await ConfigService.set('TEST_KEY', 'TestValue', {
        entityid: 'LALULLA',
        description: 'Mocha test key'
        });

        const value = await ConfigService.get('TEST_KEY');
        assert.strictEqual(value, 'TestValue');
    });

    /**
     * Test: Should update existing key
     */
    it('should update existing key', async function () {
        await ConfigService.set('TEST_KEY', 'UpdatedValue', {
        entityid: 'LALULLA'
        });

        const value = await ConfigService.get('TEST_KEY');
        assert.strictEqual(value, 'UpdatedValue');
    });

    /**
     * Test: Cache performance check (basic existence check)
     */
    it('should return cached value on repeated access', async function () {
        const first = await ConfigService.get('APP_NAME');
        const second = await ConfigService.get('APP_NAME');

        assert.strictEqual(first, second);
    });

});