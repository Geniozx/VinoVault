const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { render } = require('ejs');

router.get('/', async (req, res) => {
    try {
        res.render('views/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('vinos/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.vinos.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vinos`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;