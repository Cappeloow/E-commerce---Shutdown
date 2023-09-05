const {logIn,createAccount} = require("./userController");
const express = require("express");
const route = express.Router();

route.post('/createUser', createAccount);

route.post('/login', logIn)

route.get('/postsomething', (req, res) => {
    res.status(200).json({ message: "OK" });
});

module.exports = route;