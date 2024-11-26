const User = require('../models/user.model.js')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllUsers, getSingleUser, addUser, deleteUser, updateUser };