const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

const ONE = 2
const FOUR = 4
const SEVEN = 3
const EIGHT = 7

async function processLineByLine() {
  const fileStream = fs.createReadStream('08\\input.txt');
  //const fileStream = fs.createReadStream('08\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  result = 0
  
  for await (const line of rl) {
    //console.log(line)
    let examples = line.split('|')[0].trimEnd(' ').split(' ')
    let row = line.split('|')[1].trimStart(' ').split(' ')
    let numbers = []
    numbers[1] = getBySize(examples, ONE)
    numbers[4] = getBySize(examples, FOUR)
    numbers[7] = getBySize(examples, SEVEN)
    numbers[8] = getBySize(examples, EIGHT)
    numbers[3] = getThree(examples, numbers)
    numbers[9] = getNine(examples, numbers)
    numbers[0] = getZero(examples, numbers)
    numbers[5] = getFive(examples, numbers)
    numbers[6] = getSix(examples, numbers)
    numbers[2] = getTwo(examples, numbers)

    let toAdd = ''
    for(let i = 0; i < row.length; i++){
        for(let j = 0; j < numbers.length; j++){
            if(numbers[j].split('').sort().join() === row[i].split('').sort().join()){
                toAdd += j
            }
        }
    }
    //console.log(toAdd)
    result += Number(toAdd)
  }

  console.log(result)
}

// länge 5 und enthält 1
function getThree(digits, numbers){
    for(let digit of digits){
        if(digit.length == 5 && digit.indexOf(numbers[1].split('')[0]) != -1 && digit.indexOf(numbers[1].split('')[1]) != -1){
            //console.log("3: " + digit)
            return digit
        }
    }
}

// länge 6 und enthält 4
function getNine(digits, numbers){
    for(let digit of digits){
        if(digit.length == 6 && digit.indexOf(numbers[4].split('')[0]) != -1 && digit.indexOf(numbers[4].split('')[1]) != -1 && digit.indexOf(numbers[4].split('')[2]) != -1 && digit.indexOf(numbers[4].split('')[3]) != -1){
            //console.log("9: " + digit)
            return digit
        }
    }
}

// länge 6 und enthält 1, ist aber nicht 9
function getZero(digits, numbers){
    for(let digit of digits){
        if(digit.length == 6 && digit != numbers[9] && digit.indexOf(numbers[1].split('')[0]) != -1 && digit.indexOf(numbers[1].split('')[1]) != -1){
            //console.log("0: " + digit)
            return digit
        }
    }
}

// länge 5 und enthält den teil den 4 mehr als 1 hat
function getFive(digits, numbers){    
    let hakerl = []

    for(let c of numbers[4].split('')){
        if(numbers[1].indexOf(c) == -1){
            hakerl.push(c)
        }
    }

    for(let digit of digits){
        if(digit.length == 5 && digit.indexOf(hakerl[0]) != -1 && digit.indexOf(hakerl[1]) != -1){
            //console.log("5: " + digit)
            return digit
        }
    }
}

// länge 6 und enthält den teil den 4 mehr als 1 hat, ist aber nicht 9
function getSix(digits, numbers){    
    let hakerl = []

    for(let c of numbers[4].split('')){
        if(numbers[1].indexOf(c) == -1){
            hakerl.push(c)
        }
    }

    for(let digit of digits){
        if(digit.length == 6 && digit != numbers[9] && digit.indexOf(hakerl[0]) != -1 && digit.indexOf(hakerl[1]) != -1){
            //console.log("6: " + digit)
            return digit
        }
    }
}

// die letzte übergebliebene zahl
function getTwo(digits, numbers){
    for(let digit of digits){
        if(!numbers.includes(digit)){
            //console.log("2: " + digit)
            return digit
        }
    }
}

function getBySize(digits, size){
    for(let digit of digits){
        if(digit.length == size) return digit
    }
  return 0
}

processLineByLine();