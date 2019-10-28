const mongoose = require('mongoose');
const book = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    }, 
    name: {
        type: String,
        required: true
    }, 
    barcode: {
        type: Number,
        required: true
    }, 
    row: {
        type: Number,
        required: true
    }, 
    column: {
        type: Number,
        required: true
    }, 
    genre: {
        type: String,
        required: true
    }, 
    issuer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: "in the inventory"
    }]
});
module.exports = mongoose.model('User', book);