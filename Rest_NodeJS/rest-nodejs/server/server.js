const http = require('http');
const url = require('url');
const { userRequestHandler, studentRequestHandler, pageRequestHandler} = require('./requestResponseHandler');
const PORT = 4000;


const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(request.url, true);
  let result = null;
  if(parsedUrl.pathname === '/users.json'){
    result = userRequestHandler(request);
  }
  else if(parsedUrl.pathname === '/students.json'){
    result = studentRequestHandler(request);
  }
  else {
    result = pageRequestHandler(request);
  }
  response.end(result);
});

server.listen(PORT, () => {
  console.log(`Server Listening to port ${PORT}`);
});
