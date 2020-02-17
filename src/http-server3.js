const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
   fs.readFile(__dirname + '/read-test.html', (error, data)=>{
       if(error){
           res.writeHead(500,{'Content-Type': 'text/plain'});
           res.end('500 \n server error');
       }else{
           res.writeHead(200, {'Content-Type': 'text/html'});
           res.end(data);
       }
   });
});

server.listen(3000);