"use strict"

const fs = require('fs')

function readFile(filename) { 
  let result = fs.readFileSync(filename).toString()
  return result
}

exports.readFile = readFile