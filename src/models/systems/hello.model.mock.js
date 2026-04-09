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
 * CREATED DATE  : April 09, 2026 07:25 PM
 * ------------------------------------------------------------------------
 */

/**
 * Mock Data Store
 * Simulates the physical database table 'hello_items'
 */
let mockData = [
  { 
    id: 1, 
    title: 'Welcome to Lalulla', 
    description: 'Framework template test', 
    category: 'SYSTEM', 
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null 
  }
];

/**
 * Hello Model Mock
 * Simulates Sequelize Model methods to provide a zero-DB environment
 * for development and testing.
 */
const Hello = {
  
  /**
   * Simulate SELECT * FROM hello_items WHERE deleted_at IS NULL
   */
  findAll: async () => {
    return mockData.filter(item => item.deleted_at === null);
  },

  /**
   * Simulate SELECT * FROM hello_items WHERE id = ?
   */
  findByPk: async (id) => {
    const item = mockData.find(u => u.id == id && u.deleted_at === null);
    if (!item) return null;

    // Return object with mocked Sequelize update/destroy instance methods
    return {
      ...item,
      update: async (data) => {
        const index = mockData.findIndex(u => u.id == id);
        mockData[index] = { ...mockData[index], ...data, updated_at: new Date() };
        return mockData[index];
      },
      destroy: async () => {
        const index = mockData.findIndex(u => u.id == id);
        // Physical simulation of "Paranoid" soft delete
        mockData[index].deleted_at = new Date();
        return true;
      }
    };
  },

  /**
   * Simulate INSERT INTO hello_items
   */
  create: async (data) => {
    const newItem = {
      id: mockData.length + 1,
      title: data.title || 'Untitled',
      description: data.description || '',
      category: data.category || 'GENERAL',
      status: data.status || 'ACTIVE',
      entityid: data.entityid || 'GCONE',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    };
    mockData.push(newItem);
    
    // Return same structure with instance methods
    return Hello.findByPk(newItem.id);
  }
};

module.exports = Hello;