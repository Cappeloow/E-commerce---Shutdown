const path = require('path');
const fs = require('fs');


function getMyOrders (req,res) {
    try {
        if (req.session) {
             // Use an absolute path to the orders.json file
    const ordersFilePath = path.join(__dirname, '..', 'db', 'orders.json');

    // Read the existing orders
    const existingOrders = fs.readFileSync(ordersFilePath, 'utf-8');
    const orders = JSON.parse(existingOrders);


    const myOrders = orders.find((order) => order.email === req.session.email)
        
    if (!myOrders) {
        res.status(400).json({message:"There is no placed orders"});
    }

    res.status(200).json(myOrders);
   } else {
    res.status(401).json({message:"You need to login in to perform this action"});
   } 
    } catch (error) {
        console.log(error);   
    }

}


module.exports = getMyOrders;