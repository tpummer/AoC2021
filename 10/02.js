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

    let incomplete = []

  let count = 0
  
  for await (const line of rl) {
    console.log(line)

    let store = []
    let error = false
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
                error = true
                break
            }
        }
    }

    if(!error){
        incomplete.push(store)
    }
    count++
    //if(count == 1) break
  }


  let score = []
  for(let result of incomplete){
    score.push(calculateLine(result))
  }

  score.sort(function(a, b){return a-b});

  console.log(score)

  let res = score[(score.length-1)/2]


  console.log("Score: " + res)
}

function calculateLine(line=[]){
    console.log(line)
    let result = 0

    let map = []
    map['('] = 1
    map['<'] = 4
    map['['] = 2
    map['{'] = 3

    for(let i = line.length -1; i > -1; i--){
        //console.log(line[i])
        result = result * 5
        result += map[line[i]]
    }

    return result

}

processLineByLine();