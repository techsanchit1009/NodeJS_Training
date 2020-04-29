const http = require('http');
const { userRequestHandler, studentRequestHandler, pageRequestHandler} = require('./requestResponseHandler');
const ques1Port = 4000;
const ques2Port = 5000;
const ques3Port = 7000;

const server1 = http.createServer(userRequestHandler);
const server2 = http.createServer(studentRequestHandler);
const server3 = http.createServer(pageRequestHandler);

server1.listen(ques1Port, () => {
  console.log(`Server Listening to port ${ques1Port} for Ques1`);
});

server2.listen(ques2Port, () => {
  console.log(`Server Listening to port ${ques2Port} for Ques2`);
});

server3.listen(ques3Port, () => {
  console.log(`Server Listening to port ${ques3Port} for Ques2`);
});