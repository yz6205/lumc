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

String.prototype.splitTwo = function(pat) {
  let match = this.match(pat)
  let a = this.substr(0, match["index"])
  let b = this.substr(match["index"] + match[0].length)
  return [a, b]
}

exports.readFile = readFile