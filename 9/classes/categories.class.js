const fsPromises = require('fs').promises;
const Categories = require("../data/Categories.json");


class categories {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }

     save =async(data)=> {
        try{
            Categories.push(data);
            await fsPromises.writeFile("./data/Categories.json" ,JSON.stringify(Categories,null,2));
        }
      catch (err) {
        console.error(err);
    }
}

}
module.exports=categories;