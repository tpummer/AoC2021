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
  let aim = 0;

  for await (const line of rl) {
    if(line.startsWith("up")){
      aim = aim - Number(line.split(' ')[1]);
    }
    if(line.startsWith("down")){
      aim = aim + Number(line.split(' ')[1]);
    }
    if(line.startsWith("forward")){
      pos = pos + Number(line.split(' ')[1]);
      depth = depth + (aim * Number(line.split(' ')[1]));
    }
  }

  console.log(`Pos: ${pos} Downs: ${depth}`);
  console.log(`Multiply: ${pos * depth}`);
}

processLineByLine();
