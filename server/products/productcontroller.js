const initStripe = require('../stripe');
const stripe = initStripe();




async function getAllProducts(req, res) {
    try {
      const products = await stripe.products.list();
      const updatedProducts = [];
  
      for (const product of products.data) {
        const price = product.default_price;
        const priceDetails = await stripe.prices.retrieve(price);
  

        product.price = priceDetails.unit_amount / 100; 
  
        updatedProducts.push(product);
      }
      console.log(updatedProducts);
      res.status(200).json(updatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }


module.exports = getAllProducts;