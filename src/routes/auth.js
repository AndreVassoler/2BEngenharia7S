const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || '1234';

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      role: role || 'user'
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === 'admin123') {
      let adminUser = await User.findOne({ username: 'admin', role: 'admin' });
      
      if (!adminUser) {
        adminUser = new User({
          username: 'admin',
          email: 'admin@system.com',
          password: 'admin123',
          role: 'admin'
        });
        await adminUser.save();
      }

      const token = jwt.sign(
        { id: adminUser._id, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'Admin login successful',
        token,
        user: {
          id: adminUser._id,
          username: adminUser.username,
          role: 'admin'
        }
      });
    }

    if (usuario === 'user' && senha === 'user123') {
      let regularUser = await User.findOne({ username: 'user', role: 'user' });
      
      if (!regularUser) {
        regularUser = new User({
          username: 'user',
          email: 'user@system.com',
          password: 'user123',
          role: 'user'
        });
        await regularUser.save();
      }

      const token = jwt.sign(
        { id: regularUser._id, role: 'user' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'User login successful',
        token,
        user: {
          id: regularUser._id,
          username: regularUser.username,
          role: 'user'
        }
      });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});

module.exports = router; 