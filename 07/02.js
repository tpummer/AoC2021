const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('07\\input.txt');
  //const fileStream = fs.createReadStream('07\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let crabs = [];
  
  for await (const line of rl) {
    crabs = line.split(',').map( Number )
  }

  console.log(crabs.length)

  let min = Math.min(... crabs)
  let max = Math.max(... crabs)
  console.log("Min " + min + " Max " + max)

  let resultFuel;
  let resultSpot;
  let first = true;

  for(let i = min; i <= max; i++){
    let fuelUsed = 0;
    crabs.forEach(crab =>
        //console.log(i +" "+ calculateFuel(Math.abs(i-crab)))
      fuelUsed += calculateFuel(Math.abs(i - crab))
    )

    if(first || fuelUsed < resultFuel){
      resultFuel = fuelUsed
      resultSpot = i
      first = false
    }

    //console.log("pos " + i + " uses fuel " + fuelUsed)
  }
  
  console.log(`After ${resultFuel} fuel used all crabs are at positoin ${resultSpot}.`)
}

function calculateFuel(distance){
    if (distance < 0) {
        return 0
    }

    return fuel = distance + calculateFuel(distance - 1)
}

processLineByLine();