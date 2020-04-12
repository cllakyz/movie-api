const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [100, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
        minlength: [3, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    username: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        minlength: [5, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('user', UserSchema);