const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const initStripe = require('../stripe');
const stripe = initStripe();




const createAccount = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);


    const userDataFilePath = path.join(__dirname, '../db/user.json'); 
    const existingUserData = JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'));
    if (!fs.existsSync(userDataFilePath)) {
        fs.writeFileSync(userDataFilePath, '[]');
      }
    

    if (existingUserData.some((user) => user.username === username)) {
      res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    } else {
 

          const customer = await stripe.customers.create({
            name:name,
            email:username,
          });

          
          const newUser = {
            id:customer.id,
            username,
            name:name,
            email:username,
            password: hashedPassword,
          };
          
          existingUserData.push(newUser);
    
          fs.writeFileSync(userDataFilePath, JSON.stringify(existingUserData, null, 2));
    
          res.status(201).json({ message: 'Account created successfully!' });
        
    }


  } catch (error) {
    console.error('Error creating user account', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const userDataFilePath = path.join(__dirname, '../db/user.json');
    const existingUserData = JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'));
    
    const user = existingUserData.find((user) => user.username === username);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      delete user.password 
      if (match) {
        req.session = user;
        res.status(200).json(user)
        
      } else {
        res.status(401).json({ error: "Wrong Password" });
      }
    } else if (!user) {
      console.log("User doesn't exist");
      res.status(404).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = (req, res) => {
req.session = null;
res.status(200).json({message:"logout"})
console.log(req.session);
}

async function authorize(req, res) {
  console.log(req.session);
  if (!req.session.id) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session);
}



module.exports = { authorize, logIn, createAccount, logout };
