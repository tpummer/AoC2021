const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('03\\input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let one = [0,0,0,0,0,0,0,0,0,0,0,0];
  let zero = [0,0,0,0,0,0,0,0,0,0,0,0];

  for await (const line of rl) {
    const chars = line.split('');

    for(let i = 0; i < 12; i++){
      if(chars[i] == '1'){
        one[i]++;
      } else {
        zero[i]++;
      }
    }
  }

  let gamma = '';
  let epsilon = '';

  for(let i = 0; i < 12; i++){
    if(one[i] > zero[i]){
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }

  console.log(`One: ${gamma} Zero: ${epsilon}`);
  console.log(`One: ${parseInt(gamma,2)} Zero: ${parseInt(epsilon,2)}`);
  console.log(`Multiply: ${parseInt(gamma,2) * parseInt(epsilon,2)}`);
}

processLineByLine();
