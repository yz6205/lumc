"use strict"

const mt = require('./method.js')

function parse(label) {
  let funcName = label.match(/^\w*/)[0]
  if (mt.funcList[funcName] == undefined) {
    return `METHOD '${funcName}' not found!`
  }
  let param = label.substr(funcName.length).trim()
  return mt.funcList[funcName](param)
}

exports.parse = parse