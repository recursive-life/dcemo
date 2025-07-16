const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers, updateUser, getUserById } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// User
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router; 