const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('vinos/index.ejs', {
            wines: currentUser.wines,
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
        currentUser.wines.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vinos`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:vinosId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const wine = currentUser.wines.id(req.params.vinosId);
        res.render('vinos/show.ejs', {
            vinos: wine,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.delete('/:vinosId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.wines.id(req.params.vinosId).deleteOne();
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
        const wine = currentUser.wines.id(req.params.vinosId);
        res.render('vinos/edit.ejs', {
              vinos: wine,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:vinosId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const vinos = currentUser.wines.id(req.params.vinosId);
        vinos.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/vinos/${req.params.vinosId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

module.exports = router;