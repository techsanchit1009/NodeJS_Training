const url = require('url');
const { userData, studentData } = require('./data');


const userRequestHandler = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(request.url, true);
  let queryUsername = parsedUrl.query.userName;

  if(request.method === 'GET' && queryUsername){
    let filteredResult = userData.filter((user) => {
      return user.userName.includes(queryUsername)
    });
    response.end(JSON.stringify(filteredResult));
  }
   response.end(JSON.stringify(userData));
}

const studentRequestHandler = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);
  const queryFilter = parsedUrl.query.branch;
  
  if(request.method === 'GET' && queryFilter){
    let filteredResult = studentData.filter(student => {
      return student.branch.includes(queryFilter);
    });
    response.end(JSON.stringify(filteredResult));
  }
  response.end(JSON.stringify(studentData));
}

const pageRequestHandler = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const parsedUrl = url.parse(request.url, true);

  if(parsedUrl.pathname === '/home'){
    response.end('This is Home Page response from Server');
  } else if(parsedUrl.pathname === '/about') {
    response.end('This is About Page response from Server');
  } else if(parsedUrl.pathname === '/contactus') {
    response.end('This is Contact Page response from Server');
  }
}

module.exports = {userRequestHandler, studentRequestHandler, pageRequestHandler};