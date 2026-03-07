/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:30 PM
 * ------------------------------------------------------------------------
 */

const bcrypt = require('bcrypt')
const User = require('./user.model')

class UserService {

  async getUsers() {
    return User.findAll()
  }

  async getById(id) {
    return User.findByPk(id)
  }

  async create(data) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return User.create({
      ...data,
      password: hashedPassword
    })
  }

  /**
   * Login logic
   * 1. Find user by username
   * 2. Compare password with bcrypt
   */
  async login(username, password) {
    const user = await User.findOne({ where: { username } })

    if (!user) {
      throw new Error('Invalid username or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Invalid username or password')
    }

    return user
  }
}

module.exports = UserService