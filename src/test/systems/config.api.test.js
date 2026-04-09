/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * CREATED DATE : April 08, 2026 12:30 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const assert = require('assert');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../app');

describe('Config API Integration (JWT Protected)', function () {

    let token;

    /**
     * Generate test JWT before running tests
     */
    before(function () {

        token = jwt.sign(
            { userid: 1, username: 'testuser' },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );
    });

    /**
     * Should reject request without token
     */
    it('should reject without JWT token', async function () {

        const res = await request(app)
            .get('/api/v1/systems/config/APP_NAME');

        assert.strictEqual(res.status, 401);
    });

    /**
     * Should set configuration
     */
    it('should set configuration with valid JWT', async function () {

        const res = await request(app)
            .post('/api/v1/systems/config')
            .set('Authorization', `Bearer ${token}`)
            .send({
                key: 'TEST_API_KEY',
                value: 'HelloWorld',
                entityid: 'LALULLA'
            });

            // // Add this to see why it's failing:
            // if (res.status === 500) console.log(res.body);
    
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
    });

    /**
     * Should retrieve configuration
     */
    it('should retrieve configuration with valid JWT', async function () {

        const res = await request(app)
            .get('/api/v1/systems/config/TEST_API_KEY')
            .set('Authorization', `Bearer ${token}`);

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.value, 'HelloWorld');
    });

});