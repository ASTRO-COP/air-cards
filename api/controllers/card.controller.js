const Card = require('../models/card.model.js');

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingleCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addCard = async (req, res) => {
    try {
        const card = await Card.create(req.body);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCard = async (req, res) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCard = async (req, res) => {
    try {
        await Card.findByIdAndUpdate(req.params.id, req.body);
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getByBelongs = async (req, res) => {
    const { belongs } = req.query;
    try {
        const card = await Card.find({ belongs });
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllCards, getSingleCard, addCard, deleteCard, updateCard, getByBelongs };