const fs = require('fs');
let data = "";

for(var i=0;i<1500;i++){
  for(var j=0;j<200; j++){
    data += j.toString() + ' ';
  }
  data += '\n';
}

var writeableStream = fs.createWriteStream('output.txt','utf8');

writeableStream.write(data);
writeableStream.end();