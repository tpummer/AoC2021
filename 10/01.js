const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('10\\input.txt');
  //const fileStream = fs.createReadStream('10\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let legal = ['(', '<', '[', '{']

  let map = []
    map['('] = [')']
    map['<'] = ['>']
    map['['] = [']']
    map['{'] = ['}']

    let errors = []

  let count = 0
  
  for await (const line of rl) {
    console.log(line)

    let store = []

    let row = line.split('')

    for(let i = 0; i < row.length; i++){
        if(legal.indexOf(row[i]) != -1){
            console.log("Push" + row[i])
            store.push(row[i])
        } else {
            console.log(map[store[store.length-1]])
            if(map[store[store.length-1]] == row[i]){
                console.log("pop" + row[i])
                store.pop()
            } else {
                console.log("err" + row[i])
                errors.push(row[i])
                break
            }
        }
    }
    count++
    //if(count == 3) break
  }

  console.log("errrors:" + errors)

  console.log("Score: " + calculateScore(errors))
}

function calculateScore(errors){
    let result = 0
    let map = []
    map[')'] = 3
    map['>'] = 25137
    map[']'] = 57
    map['}'] = 1197

    for(let i = 0; i < errors.length; i++){
        result += map[errors[i]]
    }
    return result
}

processLineByLine();