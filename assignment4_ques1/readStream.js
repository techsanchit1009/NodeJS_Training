const fs = require('fs');

const readableStream = fs.createReadStream('./output.txt','utf8');
const writeableStream = fs.createWriteStream('./copy.txt','utf8');

const data=[];

let counter = 0;
readableStream.on('data',(chunk) => {
  const buffer = Buffer.from(chunk);
  data.push(buffer);
  // console.log(buffer)
  counter++;
});

readableStream.on('end', () =>{
  console.log(Buffer.concat(data).toString());
  console.log('Buffer Count: ', counter);
  console.log('File read Successfully');
});

readableStream.pipe(writeableStream);

