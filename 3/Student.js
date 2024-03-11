// const { promises } = require('dns');
// const { request } = require('http');

const fs = require('fs').promises;
let Urls =[
    './data/Marks.json',
    './data/Names.json',
    './data/PresentStudents.json'
];

const requests = Urls.map(url => fs.readFile(url));
Promise.all(requests)
.then(request=> {
     let data = [];
     request.forEach(res => data.push(JSON.parse(res)));
     console.log(data);
     return data;
})
.then(result => {
    let arr = [];
    result.map(r => arr.push(r));
    arr[0].map(r => {
        arr[1].map(Student => {
            if(Student.id === r.id)
            {
                console.log(`name - ${Student.name} id -${Student.id} adress${Student.adress} birthYear ${Student.birthYear}`);
            }
        })
        arr[2].map(mark => {
            if(mark.id === r.id)
            {
                console.log(`marks${mark.Chumash},${mark.Gmara},${mark.Navee}`);
            }  
        })
        
    })
})
.finally(console.log("end"));
   