const initStripe = require('../stripe');
const stripe = initStripe();

const MY_DOMAIN = "http://localhost:5173";

async function stripeCheckout(req, res) {
  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:"sek",
                    product_data: {
                        name: "Keps",
                        description:"blablablabla.."
                    },
                    unit_amount:"20900"
                },
                quantity:2
            }
        ],
        mode:"payment",
        success_url:`${MY_DOMAIN}/confirmation`,
        cancel_url:MY_DOMAIN,
    })
    res.status(200).json({url:session.url});
} catch (error) {
    console.log(error.message);
    res.status(400).json("Det gick inte bra");
}
}

module.exports = stripeCheckout;

