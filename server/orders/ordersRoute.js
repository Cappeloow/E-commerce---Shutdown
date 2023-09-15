const express = require("express");
const route = express.Router();
const getMyOrders = require('./ordersController');

route.get('/my-orders', getMyOrders);

module.exports = route;