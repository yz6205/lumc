"use strict"

const ut = require('./utility.js')

let funcList = {}

// built-in functions
funcList["NULL"] = ()=>""
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval

funcList["REPEAT"] = function(param) {
  const sep = "@@,", sign = "@@$"
  let template = param.split(sep)[0]
  let lines = param.split(sep)[1].split('\n')
  let result = []
  for (let line of lines) {
    line = line.trim()
    if (line == "") { continue }
    result.push(template.split(sign).join(line))
  }
  return result.join("\n")
}

exports.funcList = funcList;