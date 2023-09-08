const {logIn ,createAccount,logout} = require("./userController");
const express = require("express");
const route = express.Router();
const auth = require( "../middlewares");

route.post('/register', createAccount);

route.post('/login', logIn)

route.post('/logout', logout)

route.get('/authorize', auth);

module.exports = route;