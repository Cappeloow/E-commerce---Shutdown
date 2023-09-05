const env = require('dotenv');
env.config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

const CLIENT_URL = "http://localhost:5173"

app.use(cors({
    origin:CLIENT_URL,
}))

app.use(express.json())



app.listen(3000, () => console.log('server is now open'));
