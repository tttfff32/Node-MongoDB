const fs = require('fs').promises;
let Urls =[
    './words.json',
];
async function word(){
        const requests = Urls.map(url => fs.readFile( './words.json'));
        Promise.all(requests)
        .then(request=> {
             let data = [];
             request.forEach(res => data.push(JSON.parse(res)));
             return data;
        })
        // .then((data)=>
        // { 
        //         let i = 0;
        //         data.forEach(element => {
        //             const Address =  `http://api.dictionaryapi.dev/api/v2/entries/en/${element[i].name}`
        //             i++;
        //             console.log(Address);
        //             dict(Address);
        //         });
        // })
        .then((data)=>{ 
            let arr = [];
            data.map(d => arr.push(d));
            let i = 0;
            console.log(arr[0]);
            arr[0].forEach(element => {
                const Address =  `http://api.dictionaryapi.dev/api/v2/entries/en/${element.name}`
                i++;
                console.log(Address);
                dict(Address);
            });
        })
}
async function dict (Address){
    const res = await fetch(Address);
    if (res.ok) {
      const data = await res.json();
      data.forEach(element => {
         console.log(element.word,element.meanings[0]);
      });
    }
  }
  word();
