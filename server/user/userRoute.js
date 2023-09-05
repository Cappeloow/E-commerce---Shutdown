const createAccount = require("./userController");
const express = require("express");
const route = express.Router();

route.post('/create', createAccount);

route.get('/postsomething', (req, res) => {
    res.status(200).json({ message: "OK" });
});

module.exports = route;