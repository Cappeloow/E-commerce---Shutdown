const initStripe = require('../stripe');
const stripe = initStripe();
const fs = require('fs');
const MY_DOMAIN = "http://localhost:5173";
const path = require('path');

async function stripeCheckout(req, res) {

  const cart = req.body;
  const user =  req.session



  const line_items = cart.map((item) => ({
    price_data: {
      currency: "sek",
      product_data: {
        name: `New ${item.name}`,
        description: item.description,
      },
      unit_amount: item.price * 100, 
    },
    quantity: item.quantity,
  }));



  try {
    const session = await stripe.checkout.sessions.create({
        line_items,
        customer:user.id,
        mode:"payment",
        allow_promotion_codes: true,
        success_url:`${MY_DOMAIN}/confirmation`,
        cancel_url:MY_DOMAIN,
    })
    res.status(200).json({url:session.url, id:session.id});
} catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra");
}
}


async function verifyConfirmation(req, res) {
  const { id } = req.body;

  try {
    const retrieveConfirmation = await stripe.checkout.sessions.retrieve(id);
    const lineItems = await stripe.checkout.sessions.listLineItems(id);
    console.log("THIS IS THE ACTUAL INFORMATION FROM THE LATEST ORDER:",retrieveConfirmation);
    const deconstructedLineItems = lineItems.data.map((product) => ({
      product: product.description,
      quantity: product.quantity,
      totalSum: product.amount_total/100,
    }));

    const newOrder = {
      orderId:retrieveConfirmation.id,
      email: req.session.email,
      name: req.session.name,
      orderedItems: deconstructedLineItems,
    };

    const ordersFilePath = path.join(__dirname, '..', 'db', 'orders.json');

    // readFIle
    const existingOrders = fs.readFileSync(ordersFilePath, 'utf-8');
    const orders = JSON.parse(existingOrders);

    orders.push(newOrder);

    // writeFile
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    res.status(200).json({ retrieveConfirmation, lineItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while retrieving the order.' });
  }
}

module.exports = {stripeCheckout, verifyConfirmation};

