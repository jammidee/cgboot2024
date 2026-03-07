/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 * ------------------------------------------------------------------------
 * CREATED DATE : March 07, 2026 11:30 PM
 * ------------------------------------------------------------------------
 */

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  getUsers = async (req, res) => {
    const users = await this.userService.getUsers()
    res.json(users)
  }

  getUserById = async (req, res) => {
    const user = await this.userService.getById(req.params.id)
    res.json(user)
  }

  createUser = async (req, res) => {
    const user = await this.userService.create(req.body)
    res.status(201).json(user)
  }

  /**
   * Login controller
   * - Validates credentials
   * - Saves user info into session
   */
  login = async (req, res) => {
    const { username, password } = req.body

    const user = await this.userService.login(username, password)

    // Save minimal info in session
    req.session.user = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      store_id: user.store_id
    }

    res.json({ message: 'Login successful' })
  }

  logout = async (req, res) => {
    req.session.destroy()
    res.json({ message: 'Logged out' })
  }
}

module.exports = UserController