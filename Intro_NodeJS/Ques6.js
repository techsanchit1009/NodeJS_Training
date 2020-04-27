// Q6. Creating a http server

var http = require('http');

var server = http.createServer((request, response) => {
  // console.log(request);
  // console.log(response);  
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World HomePage</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("<h1>This is the page loaded from Server</h1>");
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(8000);
console.log('Server is listening');