const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

/* GET Movie list*/
router.get('/', (req, res, next) => {
    //const list = Movie.find({});
    const list = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: {
                path: '$director',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $sort: {
                created_at: 1
            }
        }
    ]);

    list.then((data) => {
        if (!data || data.length === 0)
            return next({ message: 'Movies was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movie List",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* GET Movie top10 list*/
router.get('/top10', (req, res, next) => {
    const list = Movie.find({}).limit(10).sort({ imdb_score: -1 });

    list.then((data) => {
        if (!data || data.length === 0)
            return next({ message: 'Top 10 Movies was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movies Top 10 List",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* POST Movie save */
router.post('/', (req, res, next) => {
    const { title, imdb_score, category, country, year, director_id } = req.body;
    const movie = new Movie({
        title: title,
        category: category,
        country: country,
        year: year,
        imdb_score: imdb_score,
        director_id: director_id,
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
router.get('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    const detail = Movie.findById(movie_id);

    detail.then((data) => {
        if (!data)
            return next({ message: 'The movie was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movie Detail",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* PUT Movie detail update */
router.put('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    req.body.updated_at = Date.now();
    const update = Movie.findByIdAndUpdate(movie_id, req.body, { new: true });

    update.then((data) => {
        if (!data)
            return next({ message: 'The movie was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movie Updated Successfully",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* DELETE Movie delete */
router.delete('/:movie_id', (req, res, next) => {
    const movie_id = req.params.movie_id;
    const remove = Movie.findByIdAndRemove(movie_id);

    remove.then((data) => {
        if (!data)
            return next({ message: 'The movie was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movie Deleted Successfully",
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* GET Movie between year list*/
router.get('/between/:start_year/:end_year', (req, res, next) => {
    const { start_year, end_year } = req.params;
    const list = Movie.find({
        year: {
            "$gte": parseInt(start_year),
            "$lte": parseInt(end_year)
        }
    }).sort({ year: 1 });

    list.then((data) => {
        if (!data || data.length === 0)
            return next({ message: 'Movies was not found', status: 404 });

        res.json({
            status: 200,
            message: "Movie List",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
