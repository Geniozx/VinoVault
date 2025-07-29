const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { render } = require('ejs');

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/vinos`);
    } else {
        res.render('index.ejs');
    }
});

module.exports = router;