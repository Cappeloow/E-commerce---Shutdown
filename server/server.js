const env = require('dotenv');
env.config();
const express = require('express');
const cors = require('cors');
const app = express();
const CLIENT_URL = "http://localhost:5173"

const CheckoutRoute = require('./checkout/checkoutRoute');
const UserRoute = require('./user/userRoute');
const ProductRoute = require('./products/productRoute');
const OrderRoute = require('./orders/ordersRoute');
const cookieSession = require('cookie-session');


app.use(cookieSession({
    name: 'session', 
    keys: ["SECRET"], 
    maxAge: 24 * 60 * 60 * 1000, 
  }));

app.use(cors({
    origin:CLIENT_URL,
}))

app.use(express.json())



app.get('/status', (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.use('/api/user', UserRoute);
app.use('/api/products', ProductRoute);
app.use('/api/checkout', CheckoutRoute);
app.use('/api/orders',OrderRoute )
app.listen(3000, () => console.log('server is now open'));
