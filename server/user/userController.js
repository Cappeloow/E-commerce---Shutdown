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
    const { username, password } = req.body;

}



module.exports = {logIn,createAccount};
