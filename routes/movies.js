const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
    const { title, imdb_score, category, country, year } = req.body;
    const movie = new Movie({
        title: title,
        category: category,
        country: country,
        year: year,
        imdb_score: imdb_score,
    });

    /*movie.save((err, data) => {
        if (err)
            res.json(err);
        res.json({
            status: 200,
            message: "Movie Created Successfully",
            data: data
        });
    });*/

    const save = movie.save();
    save.then((data) => {
        res.json({
            status: 200,
            message: "Movie Created Successfully",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
