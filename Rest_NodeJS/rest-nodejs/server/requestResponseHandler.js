const url = require('url');
const { userData, studentData } = require('./data');


const userRequestHandler = (request) => {
  const parsedUrl = url.parse(request.url, true);
  let queryUsername = parsedUrl.query.userName;

  if(request.method === 'GET' && queryUsername){
    let filteredResult = userData.filter((user) => {
      return user.userName.includes(queryUsername)
    });
    return (JSON.stringify(filteredResult));
  }
   return (JSON.stringify(userData));
}

const studentRequestHandler = (request) => {
  const parsedUrl = url.parse(request.url, true);
  const queryFilter = parsedUrl.query.branch;
  
  if(request.method === 'GET' && queryFilter){
    let filteredResult = studentData.filter(student => {
      return student.branch.includes(queryFilter);
    });
    return (JSON.stringify(filteredResult));
  }
  return (JSON.stringify(studentData));
}

const pageRequestHandler = (request) => {
  const parsedUrl = url.parse(request.url, true);

  if(parsedUrl.pathname === '/home'){
    return 'This is Home Page response from Server';
  } else if(parsedUrl.pathname === '/about') {
    return 'This is About Page response from Server';
  } else if(parsedUrl.pathname === '/contactus') {
    return 'This is Contact Page response from Server';
  }
}

module.exports = {userRequestHandler, studentRequestHandler, pageRequestHandler};