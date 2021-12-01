const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('01\\input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  let up = 0;
  let down = 0;
  let before = 0;
  let first = true;

  for await (const line of rl) {
    if(!first){
      if(Number(line) > Number(before)) up++;
      if(Number(before) > Number(line)) down++;
    } else {
      first = false;
    }
    before = line
    count++;
  }
  console.log(`Ups: ${up} Downs: ${down}`);
  console.log(count);
}

processLineByLine();
