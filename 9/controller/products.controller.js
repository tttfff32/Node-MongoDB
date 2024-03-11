const express = require('express');
const router = express.Router();
const Products = require("../data/Products.json");
const product = require('../classes/products.class')

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;


router.get('/:category', (req, res) => {
    const Category = req.params.category;
    const product = Products.filter(prod => prod.category === Category);
    if (product) {
        const SortProdCategory = product.sort((a,b) => {
            return a.prodName.localeCompare(b.prodName)
          });
      res.status(200).send(SortProdCategory);
    }
    else {
      res.status(404).send('Product not found');
    }
  });

  router.get('/:category/:id', (req, res) => {
    const Category = req.params.category
    const Prodid = req.params.id;
    const product = Products.find(prod => prod.category === Category && prod.prodid === Prodid);
    if (product) {
      res.status(200).send(product);
    }
    else {
      res.status(404).send('Product not found');
    }
  });


  router.post('/', async(req, res) => {
      try {
         const data = req.body;
        const prod=new product(req.body.prodid,req.body.prodName,req.body.category);
        prod.save(data);
        res.send("File written successfully");
  
      } catch (err) {
        console.error(err);
      }
   });
  
  
  router.delete('/:category/:deletId', async(req, res) => {
    try {
     const Category= req.params.category;
      const id = req.params.deletId;
      const itemIndex = Products.findIndex(prod => prod.category === Category && prod.prodid === id);
      console.log(itemIndex);
      if (itemIndex === undefined) {
        res.status(404);
        res.send(`category or id not found : (  `);
      }
      else {
        Products.splice(itemIndex,1);
       await fsPromises.writeFile("./data/Products.json",JSON.stringify(Products,null,2));
        res.send(`DELETE Request Called:${id}`);
      }
    }
    catch(err)
    {
     console.log(`catch erorr`);
    }
  
  });
  
  router.put('/:category/:putId', async(req, res) => {
    try {
        const Category= req.params.category;
      const id = req.params.putId;
      const itemIndex = Products.findIndex(prod => prod.category=== Category && prod.prodid === id);
      console.log(itemIndex);
      if (itemIndex === -1) {
        res.status(404);
        res.send(`category or id not found : (  `);
      }
      else {
        Products[itemIndex]={
          prodid:id,
          prodName:req.body.prodName||Products[itemIndex].prodName,
          category:req.body.category||Products[itemIndex].category
          
        }
        await fsPromises.writeFile("./data/Products.json",JSON.stringify(Products,null,2));
        res.send("the product update!");
      }
  }catch{
    console.log("put error");
  }
  });
  

  
  module.exports = router;