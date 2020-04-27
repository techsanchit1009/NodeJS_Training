var fs = require('fs');

console.log('Log before reading file!');

fs.readFile('./test.txt','utf8', (err, content) => {
  console.log(content);
});

console.log('Log after reading file!');