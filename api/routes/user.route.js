const express = require('express');
const { getAllUsers, getSingleUser, addUser, updateUser, deleteUser } = require('../controllers/user.controller');

const router = express.Router();

// GET //
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);

// POST //
router.post('/', addUser);

// UPDATE //
router.put('/:id', updateUser);

// DELETE //
router.delete('/:id', deleteUser);

module.exports = router;