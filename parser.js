"use strict"

const ut = require('./utility.js')

let funcList = {}

// built-in functions
funcList["NULL"] = ()=>""
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval

function parse(label) {
  let funcName = label.match(/^\w*/)[0]
  if (funcList[funcName] == undefined) {
    return `METHOD '${funcName}' not found!`
  }
  let param = label.substr(funcName.length).trim()
  return funcList[funcName](param)
}

exports.parse = parse