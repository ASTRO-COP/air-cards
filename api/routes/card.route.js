const express = require('express');
const { getAllCards, getSingleCard, addCard, updateCard, deleteCard } = require('../controllers/card.controller');

const router = express.Router();

// GET //
router.get('/', getAllCards);
router.get('/:id', getSingleCard);

// POST //
router.post('/', addCard);

// PUT //
router.put('/:id', updateCard);

// DELETE //
router.delete('/:id', deleteCard);

module.exports = router;