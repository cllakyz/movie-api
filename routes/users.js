const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');

/* POST register */
router.post('/register', (req, res, next) => {
    const { fullname, username, password } = req.body;

    const user = new User({
        fullname,
        username,
        password
    });

    user.save()
        .then((data) => {
            res.json({
                status: 200,
                message: "User Registered Successfully",
                data: data
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;
