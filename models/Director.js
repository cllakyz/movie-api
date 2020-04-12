const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    fullname: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [100, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
        minlength: [3, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    born: {
        type: String,
        maxlength: [100, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
    },
    bio: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('director', DirectorSchema);