const initStripe = require('../stripe');
const stripe = initStripe();




async function getAllProducts (req, res) {
const products = await stripe.products.list({
});

res.status(200).json(products);

}


module.exports = getAllProducts;