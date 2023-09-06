const env = require('dotenv');
env.config();
const express = require('express');
const cors = require('cors');

const app = express();
const CLIENT_URL = "http://localhost:5173"

const UserRoute = require('./user/userRoute');
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

app.use('/user', UserRoute);



app.listen(3000, () => console.log('server is now open'));
