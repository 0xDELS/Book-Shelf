const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'N/A'
    },
    pages: {
        type: String,
        default: 'N/A' 
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: String,
        default: 'N/A'
    },
    ownerID: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };