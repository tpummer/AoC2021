const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('01\\input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let up = 0;
  let down = 0;
  let before = 0;
  let next = 1;

  let values = [];

  for await (const line of rl) {
    values.push(Number(line));
  }

  let size = values.length;

  console.log(values);
  console.log(size);

  while(next < size-2){
    let beforeScore = values[before] + values[before+1] + values[before+2];
    let nextScore = values[next] + values[next+1] + values[next+2];

    if(Number(nextScore) > Number(beforeScore)) up++;
    if(Number(beforeScore) > Number(nextScore)) down++;
    before++;
    next++;
  }
  console.log(next);
  console.log(`Ups: ${up} Downs: ${down}`);
}

processLineByLine();
