
const stdin = process.stdin;
const stdout = process.stdout;

const ask = function(question){
  return new Promise(function(resolve, reject){
    stdin.resume();
    stdin.setEncoding('utf8');
    stdout.write(question + ' ')
    stdin.once('data', function(data){
      if(data){
        data = data.trim();
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}

// Returns a string containing today's date in the
// format of 'mm-dd-yyyy'
const today = function() {
  let date = new Date();
  return String(date.getMonth() + 1).padStart(2, '0') + '-'
    + String(date.getDate()).padStart(2, '0') + '-'
    + String(date.getFullYear());
}

module.exports = {
    ask,
    today
}
