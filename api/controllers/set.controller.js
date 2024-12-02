const mongoose = require('mongoose');
const Set = require('../models/set.model.js');

const getAllSets = async (req, res) => {
    try {
        const sets = await Set.find();
        res.status(200).json(sets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingleSet = async (req, res) => {
    try {
        const set = await Set.findById(req.params.id);
        res.status(200).json(set);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addSet = async (req, res) => {
    try {
        const set = await Set.create(req.body);
        res.status(200).json(set);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteSet = async (req, res) => {
    try {
        await Set.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Set deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateSet = async (req, res) => {
    try {
        await Set.findByIdAndUpdate(req.params.id, req.body);
        const set = await Set.findById(req.params.id);
        res.status(200).json(set);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getByBelongs = async (req, res) => {
    const { belongs } = req.query;
    try {
        const set = await Set.find({ belongs });
        if (!set) return res.status(404).json({ message: 'Set not found' });
        res.status(200).json(set);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllSets, getSingleSet, addSet, deleteSet, updateSet, getByBelongs };