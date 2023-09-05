const fs = require('fs');
const bcrypt = require('bcrypt');

const createAccount = async (req, res) => {
try {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const userData = {
        username,
        password:hashedPassword
    }
    
    fs.writeFileSync('user.json', JSON.stringify(userData, null,2))
    
    res.status(201).json({message:"Account created successfully!"})
} catch (error) {
    console.error('error creating user account', error);
    res.status(500).json({message:"Internal server error"});
}


}


module.exports = createAccount
