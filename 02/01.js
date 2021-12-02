const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('02\\input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let pos = 0;
  let depth = 0;
  let before = 0;
  let next = 1;

  let values = [];

  for await (const line of rl) {
    if(line.startsWith("up")){
      depth = depth - Number(line.split(' ')[1]);
    }
    if(line.startsWith("down")){
      depth = depth + Number(line.split(' ')[1]);
    }
    if(line.startsWith("forward")){
      pos = pos + Number(line.split(' ')[1]);
    }
  }

  console.log(`Pos: ${pos} Downs: ${depth}`);
  console.log(`Multiply: ${pos * depth}`);
}

processLineByLine();
