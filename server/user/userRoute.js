const express = require("express");
const route = express.Router();
const bcrypt = require('bcrypt');

route.post('/create', (req,res) => {

})

route.get('/postsomething', (req, res) => {
    res.status(200).json({ message: "OK" });
});

module.exports = route;