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
 * CREATED DATE  : April 09, 2026 07:50 PM
 * ------------------------------------------------------------------------
 */

'use strict';

const assert = require('assert');
const request = require('supertest');
const app = require('../../../../../app'); 

describe('Hello API (Template Module)', function () {

    let jwtToken = null;
    let createdId = null;

    /**
     * Setup: Authenticate against the real Auth API
     */
    before(async function () {
        const username = 'testuser';
        const password = 'P@55w0rd!User'; 
        
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        
        const res = await request(app)
            .post('/api/v1/systems/auth/token')
            .set('Authorization', `Basic ${credentials}`);
        
        if (res.body && res.body.success) {
            jwtToken = res.body.token;
        } else {
            throw new Error(`Authentication failed: ${res.body.message || 'Unknown error'}`);
        }
    });

    /**
     * Test: POST /api/v1/hello (Create)
     */
    it('should create a new hello record', async function () {
        const payload = {
            title: 'Test Component',
            description: 'Testing the physical route with mocked model',
            category: 'TEST'
        };

        const res = await request(app)
            .post('/api/v1/hello')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(payload);

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.success, true);
        assert.ok(res.body.data.id);
        
        createdId = res.body.data.id; 
    });

    /**
     * Test: GET /api/v1/hello (Read All)
     */
    it('should retrieve all hello records', async function () {
        const res = await request(app)
            .get('/api/v1/hello')
            .set('Authorization', `Bearer ${jwtToken}`);

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.ok(Array.isArray(res.body.data));
    });

    /**
     * Test: GET /api/v1/hello/:id (Read One)
     */
    it('should retrieve a specific record by ID', async function () {
        const res = await request(app)
            .get(`/api/v1/hello/${createdId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.data.id, createdId);
    });

    /**
     * Test: PUT /api/v1/hello/:id (Update)
     */
    it('should update an existing record', async function () {
        const res = await request(app)
            .put(`/api/v1/hello/${createdId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({ title: 'Updated Title' });

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.data.title, 'Updated Title');
    });

    /**
     * Test: DELETE /api/v1/hello/:id (Delete)
     */
    it('should soft-delete a record', async function () {
        const res = await request(app)
            .delete(`/api/v1/hello/${createdId}`)
            .set('Authorization', `Bearer ${jwtToken}`);

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
    });
});