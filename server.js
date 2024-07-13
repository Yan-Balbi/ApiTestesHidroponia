const http = require('http');
const app = require('./app');
const port = 3333;

const server = http.createServer(app);

server.listen(port, () =>{
    console.log('Server runing in port:' +port);
});

