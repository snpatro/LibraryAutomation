const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    username: {
        type: Number,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 16,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    department: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    proPic:{
        type:String,
        default:"data:image/jpeg;base64,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"
    },
    inventory:{
        type:[],
        default:[]
    },
    fee:{
        type:Number,
        default: 0
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 8, null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);