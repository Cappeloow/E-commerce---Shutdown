const express = require("express");
const route = express.Router();
const getAllProducts = require("./productcontroller");

route.get('/getAllProducts', getAllProducts);

module.exports = route;