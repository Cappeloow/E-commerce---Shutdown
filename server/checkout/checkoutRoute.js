const stripeCheckout = require( "./checkoutController");
const express = require('express');
const route = express.Router();

route.post('/create-checkout-session', stripeCheckout );


route.get('/test', (req, res ) => {
 res.status(200).json("hiiithere!!");   
})
module.exports = route;



