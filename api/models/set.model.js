const mongoose = require('mongoose');

const SetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    belongs: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
})

const Set = mongoose.model('Set', SetSchema);
module.exports = Set;