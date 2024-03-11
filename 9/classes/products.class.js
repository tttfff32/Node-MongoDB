const fsPromises = require('fs').promises;
const Products = require("../data/Products.json");

class Product {
    constructor(prodid, prodName,category) {
      this.prodid = prodid;
      this.prodName = prodName;
      this.category=category;
    }

    save =async(data)=> {
        try{
            Products.push(data);
            await fsPromises.writeFile("./data/Products.json" ,JSON.stringify(Products,null,2));
        }
      catch (err) {
        console.error(err);
    }
}
}
module.exports=Product;