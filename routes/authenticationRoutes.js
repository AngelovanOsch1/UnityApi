const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    
    app.post('/account/create', async (req, res) => { 
        
        const data = req.body

        if(data.registerUsername.length < 3 || data.registerPassword.length < 5) {
            res.status(409).json("Username needs to be at least 3 characters and password needs to be at least 5 characters")
        }
        else {
            var userAccount = await Account.findOne({ username: data.registerUsername});
            if(userAccount == null) 
            {
                var newAccount = new Account({
                    username: data.registerUsername,
                    password: data.registerPassword,
        
                    lastAuthentication: Date.now()
                });          
                await newAccount.save()
                res.send(newAccount)
                // res.status(202).json("Account has been created")             
            } else {
               res.status(409).json("Username is taken")
            }    
        }
    })
    
    app.post('/account/login', async (req, res) => {
        
        const data = req.body

        if(data.loginUsername == "" || data.loginPassword == "") {
            res.status(409).json("Fields cannot be empty")
            return;
        } 
        else {
            var userAccount = await Account.findOne({ username: data.loginUsername});
            if(userAccount != null) 
            {
                if(data.loginPassword  == userAccount.password) {
                    userAccount.lastAuthentication = Date.now();
                    await userAccount.save();
                    res.send(userAccount);
                    return;
                }
            }
            res.status(409).json("Invalid credentials")
            return;   
        } 
    })
 }
