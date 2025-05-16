const { registerUser, loginUser } = require('../services/userService');
const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const { user } = require('../../databases/postgres/models');

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserByID(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserByID(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    await userService.updateUser(req.user.id, req.body);
    const updated = await userService.getUserByID(req.user.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUserByID(req.user.id);
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchAll = async (req, res) => {
  const { q } = req.query;
  // if (!q || q.length < 2) {
  //   return res.status(400).json({ error: 'Query must be at least 2 characters.' });
  // }

  try {
    const results = await userService.searchGlobal(q);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.bulkRegister = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'Expected an array of users' });
    }

    const results = [];
    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const createdUser = await user.create({
        username: u.username,
        email: u.email,
        passwordHash: hashedPassword,
        seller: u.seller || false,
        verified: u.verified || false
      });
      results.push({
        userID: createdUser.userID,
        username: createdUser.username,
        email: createdUser.email
      });
    }

    return res.status(201).json({ success: true, count: results.length, users: results });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
