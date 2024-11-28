const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    belongs: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
    liked: {
        type: Boolean,
        default: false,
    }
})

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;