const {logIn ,createAccount} = require("./userController");
const express = require("express");
const route = express.Router();
const auth = require( "../middlewares");

route.post('/createUser', createAccount);

route.post('/login', logIn)

route.get('/authorize', auth);

module.exports = route;