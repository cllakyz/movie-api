const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

/* GET Director list*/
router.get('/', (req, res) => {
    const list = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    fullname: '$fullname',
                    born: '$born',
                    bio: '$bio',
                    created_at: '$created_at'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                fullname: '$_id.fullname',
                born: '$_id.born',
                bio: '$_id.bio',
                created_at: '$_id.created_at',
                movies: '$movies',
            }
        },
        {
            $sort: {
                created_at: 1
            }
        }
    ]);

    list.then((data) => {
        res.json({
            status: 200,
            message: "Director List",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* POST Director save */
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const save = director.save();

    save.then((data) => {
        res.json({
            status: 200,
            message: "Director Created Successfully",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* GET Director detail */
router.get('/:director_id', (req, res, next) => {
    const detail = Director.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    fullname: '$fullname',
                    born: '$born',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                fullname: '$_id.fullname',
                born: '$_id.born',
                bio: '$_id.bio',
                movies: '$movies',
            }
        }
    ]);

    detail.then((data) => {
        if (!data)
            return next({ message: 'The director was not found' });

        res.json({
            status: 200,
            message: "Director Detail",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* PUT Director detail update */
router.put('/:director_id', (req, res, next) => {
    req.body.updated_at = Date.now();
    const update = Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true });

    update.then((data) => {
        if (!data)
            return next({ message: 'The director was not found' });

        res.json({
            status: 200,
            message: "Director Updated Successfully",
            data: data
        });
    }).catch((err) => {
        res.json(err);
    });
});

/* DELETE Director delete */
router.delete('/:director_id', (req, res, next) => {
    const remove = Director.findByIdAndRemove(req.params.director_id);

    remove.then((data) => {
        if (!data)
            return next({ message: 'The director was not found' });

        res.json({
            status: 200,
            message: "Director Deleted Successfully",
        });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
