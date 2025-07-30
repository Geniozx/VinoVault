const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('vinos/index.ejs', {
            vinos: currentUser.wines,
        });
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

router.get('/vinosId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const wines = currentUser.wines.id(req.params.vinosId);
        res.render('vinos/show.ejs', {
            vinos: wines
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.delete('/:vinosId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.vinos.id(req.params.vinosId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vinos`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:vinosId/edit', async (req, res) => {
    try { 
        const currentUser = await User.findById(req.session.user._id);
        const wines = currentUser.vinos.id(req.params.vinosId);
        res.render('vinos/edit.ejs', {
              vinos: wines
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;