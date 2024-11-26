const express = require('express');
const { getAllSets, getSingleSet, addSet, updateSet, deleteSet } = require('../controllers/set.controller');

router = express.Router();

// GET //
router.get('/', getAllSets);
router.get('/:id', getSingleSet);

// POST //
router.post('/', addSet);

// UPDATE //
router.put('/:id', updateSet);

// DELETE //
router.delete('/:id', deleteSet);

module.exports = router;