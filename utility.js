"use strict"

const fs = require('fs')

function readFile(filename) { 
  try {
    let result = fs.readFileSync(filename).toString()
    return result
  } catch(err) {
    console.error(`Warning: reading ${filename} failed`)
    return `Warning: reading ${filename} failed`
  }
}

exports.readFile = readFile