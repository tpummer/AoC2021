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

  let gamma = '';
  let epsilon = '';

  let valuesOx = [];
  let valuesCo2 = []

  //readlines and count

  for await (const line of rl) {
    valuesOx.push(line);
    valuesCo2.push(line);
    const chars = line.split('');

    for(let i = 0; i < 12; i++){
      if(chars[i] == '1'){
        one[i]++;
      } else {
        zero[i]++;
      }
    }
  }

  //Ox

  for(let i = 0; i < 12 && valuesOx.length > 1; i++){
    let zwischen = [];
    if(Number(one[i]) >= Number(zero[i])){
      for (const value of valuesOx){
        if(Number(value.split('')[i]) === 1){
          zwischen.push(value);
        }
      }
    } else {
      for (const value of valuesOx){
        if(Number(value.split('')[i]) === 0){
          zwischen.push(value);
        }
      }
    }
    valuesOx = zwischen;
    one = [0,0,0,0,0,0,0,0,0,0,0,0];
    zero = [0,0,0,0,0,0,0,0,0,0,0,0];

    for(const newline of valuesOx){
      const chars = newline.split('');

      for(let i = 0; i < 12; i++){
        if(chars[i] == '1'){
          one[i]++;
        } else {
          zero[i]++;
        }
      }
    }
  }

  var ox = valuesOx[0];


  //co2
  for(let i = 0; i < 12 && valuesCo2.length > 1; i++){
    let zwischen = [];
    if(Number(one[i]) < Number(zero[i])){
      for (const value of valuesCo2){
        if(Number(value.split('')[i]) === 1){
          zwischen.push(value);
        }
      }
    } else {
      for (const value of valuesCo2){
        if(Number(value.split('')[i]) === 0){
          zwischen.push(value);
        }
      }
    }
    valuesCo2 = zwischen;
    one = [0,0,0,0,0,0,0,0,0,0,0,0];
    zero = [0,0,0,0,0,0,0,0,0,0,0,0];

    for(const newline of valuesCo2){
      const chars = newline.split('');

      for(let i = 0; i < 12; i++){
        if(chars[i] == '1'){
          one[i]++;
        } else {
          zero[i]++;
        }
      }
    }
  }
  var co2 = valuesCo2[0];




  console.log(`ox: ${ox} co2: ${co2}`);
  console.log(`ox: ${parseInt(ox,2)} co2: ${parseInt(co2,2)}`);
  console.log(`Multiply: ${parseInt(ox,2) * parseInt(co2,2)}`);
}

processLineByLine();
