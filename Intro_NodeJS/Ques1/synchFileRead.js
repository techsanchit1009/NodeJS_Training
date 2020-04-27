var fs = require('fs');

console.log('Log before reading file!');

var content = fs.readFileSync('./test.txt', 'utf8');
console.log(content);

console.log('Log after reading file!');

