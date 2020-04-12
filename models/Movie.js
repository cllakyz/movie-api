const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [50, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
        minlength: [3, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    category: {
        type: String,
        maxlength: [50, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
        minlength: [3, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    country: {
        type: String,
        maxlength: [50, '{PATH} ({VALUE}), {MAXLENGTH} karakterden fazla olamaz.'],
        minlength: [3, '{PATH} ({VALUE}), {MINLENGTH} karakterden az olamaz.']
    },
    year: {
        type: Number,
        max: [parseInt(new Date().getFullYear()), '{PATH} ({VALUE}), {MAX}\'dan büyük olamaz.'],
        min: [1900, '{PATH} ({VALUE}), {MIN}\'dan küçük olamaz.']
    },
    imdb_score: {
        type: Number,
        max: [10, '{PATH} ({VALUE}), {MAX}\'dan büyük olamaz.'],
        min: [0, '{PATH} ({VALUE}), {MIN}\'dan küçük olamaz.']
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

module.exports = mongoose.model('movie', MovieSchema);