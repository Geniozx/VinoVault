const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { render } = require('ejs');

router.get('/', async (req, res) => {
    try {
        res.render('vinos/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('vinos/new.ejs');
});

module.exports = router;