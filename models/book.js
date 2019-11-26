const mongoose = require('mongoose');
const book = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        required: true
    }, 
    title: {
        type: String,
        required: true
    }, 
    barcode: {
        type: String,
        required: true
    }, 
    subject: {
        type: String,
        required: true
    }, 
    issuer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        
    }]
});
module.exports = mongoose.model('Book', book);