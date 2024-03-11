const User = require("./Users.json");
const express = require('express');
const app = express();
const port = 8000;
 


  
//הצגת העובדים
app.get('/User', (req, res) => {
    res.send(`${JSON.stringify(User)}`)
})

//הצגת העובדים שמעל גיל 20 
app.get('/Worker', (req, res) => {
    const CheckWorker = () =>{
        let BirthDate = [];
        User.forEach(element => {
            const now = new Date().getFullYear();
            if(element.BirthDate<= (now-20)){
                   if(element.Status==="Employee")
                     {
                        BirthDate.push(element.Name);
                        console.log(element.Name);
                     }
                
            }
        });
        let goodWork =[];
          BirthDate.forEach(element => { 
            goodWork.push(element)
          });
          return goodWork;
        }
    res.send(`${CheckWorker()}`)
})


app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
