const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const createAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);



    const userDataFilePath = path.join(__dirname, '../db/user.json'); 
    const existingUserData = JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'));
    if (!fs.existsSync(userDataFilePath)) {
        fs.writeFileSync(userDataFilePath, '[]');
      }
    

    if (existingUserData.some((user) => user.username === username)) {
      res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    } else {
        const newUser = {
            username,
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
    console.log(existingUserData);

    const user = existingUserData.find((user) => user.username === username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.user = user;
        res.status(200).json({message:"Login successful"})
      } else {
        console.log("Password doesn't match");
        res.status(401).json({ error: "Password doesn't match" });
      }
    } else {
      console.log("User doesn't exist");
      res.status(404).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { logIn, createAccount };
