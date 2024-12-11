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
    content: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now(),
    }
})

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;