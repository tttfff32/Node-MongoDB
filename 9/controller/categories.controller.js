const express = require('express');
const router = express.Router();
const Categories = require("../data/Categories.json");

const fs = require('fs');
const { log } = require('console');
const categoriesClass = require('../classes/categories.class');
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  const SortCategory = Categories.sort((a,b) => {
    return a.Name.localeCompare(b.Name)
  });
  res.status(200).send(SortCategory);
});

router.get('/:categoryId', (req, res) => {
    const id = req.params.categoryId;
    const Category = Categories.find(category => category.id === id);
    if (Category) {
      res.status(200).send(Category);
    }
    else {
      res.status(404).send('Category not found');
    }
  });

  router.get('/:even', (req, res) => {
    const even = req.params.even;
    if(even==="even")
         Category = Categories.findIndex(cat =>cat %2=== 0) ;
     if(even==="odd")
        Category = Categories.findIndex(cat => cat %2 !== 0);
    if (Category) {
      res.status(200).send(Category);
    }
    else {
      res.status(404).send('Category not found');
    }
  });
  router.post('/', async(req, res) => {
      try {
         const data = req.body;
         const newCategoryObject=new categoriesClass(req.body.id,req.body.name);
         newCategoryObject.save(data);
         res.send("File written successfully");

        
      } catch (err) {
        console.error(err);
      }
   });
  
  
  router.delete('/:deletId', async(req, res) => {
    try {
      const id = req.params.deletId;
      const itemIndex = Categories.findIndex(category => category.id === id);
      console.log(itemIndex);
      if (itemIndex === undefined) {
        res.status(404);
        res.send(`category not found : (  `);
      }
      else {
        Categories.splice(itemIndex,1);
       await fsPromises.writeFile("./data/Categories.json",JSON.stringify(Categories,null,2));
        res.send(`DELETE Request Called:${id}`);
      }
    }
    catch(err)
    {
     console.log(`catch erorr`);
    }
  
  });
  
  router.put('/:putId', async(req, res) => {
    try {
      const id = req.params.putId;
      const itemIndex = Categories.findIndex(category => category.id=== id);
      console.log(itemIndex);
      if (itemIndex === -1) {
        res.status(404);
        res.send(`category not found : (  `);
      }
      else {
        Categories[itemIndex]={
          id:id,
          Name:req.body.Name||Categories[itemIndex].Name
        }
        await fsPromises.writeFile("./data/Categories.json",JSON.stringify(Categories,null,2));
        res.send("the category update!");
      }
  }catch{
    console.log("put error");
  }
  });
  

  
  module.exports = router;