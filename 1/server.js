const http = require('http');
const port = 8000;

const user= require('./user');
const list= require('./students');

const server = http.createServer((request,response)=>{
    response.writeHead( 200 ,{"content-type" : "text/html"})

    
    response.write('<html>');
    response.write('<head>');
    response.write('<style>');
    response.write('.larger-text { font-size: 50px; }'); 
    response.write('</style>');
    response.write('</head>');
    response.write('<body>');

     
    response.write('<p>my student list:</p>');
    response.write('<ul>');
    list.forEach(Element => {
        response.write('<li>' + Element + '</li>');
    });
    response.write('</ul>');

     const a = user.firstName;
     const b=user.lastName;
    response.write('<p>hello <span class="larger-text">' + a + '</span>'+b+' !!!!</p>'); 

    response.write('</body>');
    response.write('</html>');
    response.end();

});

server.listen(port);
