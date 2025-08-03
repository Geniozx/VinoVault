const express = require("express");
const bcrypt = require("bcrypt"); 
const router = express.Router();
const Vinos = require("../models/user.js");

router.get('/', async (req, res) => {
    try {
        const allVinos = await Vinos.find({});
        res.render('shaina/shaina', { vinos: allVinos });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;