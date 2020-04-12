const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

/* GET Movie list*/
router.get('/', (req, res) => {
    const list = Movie.find({});
    list.then(data => {
        res.json({
            status: 200,
            message: "Movie List",
            data: data
        });
    }).catch(err => {
        res.json(err);
    });
});

/* POST Movie save */
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

/* GET Movie detail */
router.get('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id;
    const detail = Movie.findById(movie_id);
    detail.then(data => {
        res.json({
            status: 200,
            message: "Movie Detail",
            data: data
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;
