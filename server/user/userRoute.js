const express = require("express");
const route = express.Router();

route.get('/test', (req,res) => {
    res.status(200).json({message:"userRoute works"});
})

route.get('/postsomething', (req, res) => {
    res.status(200).json({ message: "OK" });
});

module.exports = route;