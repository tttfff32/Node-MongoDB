
const express = require('express');
const router = express.Router();
const Users = require("../data/Users.json");

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
router.post('/signUp', async(req, res) => {
    try {
        const { userName, password, id,Fname } = req.body;
        if(!(userName, password, id,Fname ))  
                res.status(400).send("All input is required in signup");     

       encryptedPassword = await bcrypt.hash(password, 10);
       const data ={
        userName: userName,
        password: encryptedPassword,
        id:id,
        Fname:Fname
       }
        Users.push(data);
       await fsPromises.writeFile( "./data/Users.json" ,JSON.stringify(Users,null,2));
      res.send("File written successfully");

    } catch (err) {
      console.error(err);
    }
 });


 // Login
router.post(  '/login', async (req, res) => {
    try {
        const { userName , password }=req.body ;
             if (!(userName && password)) {
                 res.status(400).send("All input is required in login");
          }
         const user =Users.find(user=>user.userName===userName);
          if (userName && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
              { id: user.id, Fname:user.Fname },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            user.token = token;
            res.header("auth-token", token).send({"token": token});
            
            }
        }
    catch (err) {
            res.status(401).send(`userName or Password is wrong`);
    }
    
});

module.exports = router;