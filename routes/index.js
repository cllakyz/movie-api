const express = require('express');
const router = express.Router();

/* GET home */
router.get('/', (req, res, next) => {
    res.json({ title: 'Express Movie Api' });
});

module.exports = router;
