"use strict"

const fs = require('fs')

function treatConfig(content) {
  let lines = content.split("\n");
  let result = []
  for (let line of lines) {
    line = line.trim()
    if (line == "" || line[0] == '#') {
      continue
    }
    result.push(line)
  }
  return result.join("\n")
}

function readFile(filename) { 
  let result = fs.readFileSync(filename).toString()
  if (filename.endsWith(".conf")) {
    result = treatConfig(result)
  }
  return result
}

exports.readFile = readFile