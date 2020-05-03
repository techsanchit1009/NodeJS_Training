const { execFile } = require('child_process');

const childProcess = execFile('ps', ['-a','-u'], (err, stdout, stderr) => {
if (err) {
console.log('An error occured =>\n', err);
}
console.log('Output \n', stdout);
});