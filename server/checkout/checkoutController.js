const initStripe = require('../stripe');
const stripe = initStripe();

const MY_DOMAIN = "http://localhost:5173";

async function stripeCheckout(req, res) {

  const cart = req.body;
  const user =  req.session.user


  console.log(user);

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
        success_url:`${MY_DOMAIN}/confirmation`,
        cancel_url:MY_DOMAIN,
    })
    console.log("this is the session:", session);
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

   // save the orders into the db (json file);

    console.log("this is the line items:",  lineItems);
    res.status(200).json({retrieveConfirmation, lineItems} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while retrieving the order.' });
  }
}

module.exports = {stripeCheckout, verifyConfirmation};

