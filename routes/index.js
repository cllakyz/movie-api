const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');

/* GET home */
router.get('/', (req, res, next) => {
    //res.json({ title: 'Express Movie Api' });
    res.render('index', { title: 'Express Movie Api' });
});

/* POST register */
router.post('/register', (req, res, next) => {
    const { fullname, username, password } = req.body;

    bcryptjs.hash(password, 10)
        .then((hash) => {
            const user = new User({
                fullname,
                username,
                password: hash
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
});

/* POST authenticate */
router.post('/authenticate', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
        return next({ message: 'Authentication failed, wrong username or password', status: 422 });

    User.findOne({ username }, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return next({ message: 'Authentication failed. The user was not found', status: 404 });

        bcryptjs.compare(password, user.password)
            .then((result) => {
                if (!result)
                    return next({ message: 'Authentication failed, wrong password', status: 422 });

                const payload = { username };
                const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                    expiresIn: 720 // 12 saat
                });
                res.json({
                    status: 200,
                    message: "Authentication Successfully",
                    token
                });
            });
    });
});

module.exports = router;
