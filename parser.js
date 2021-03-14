"use strict"

const labelReg = /{{[^{}]*}}/

const mt = require('./method.js')

function parseLabel(label) {
  let funcName = label.match(/^\w*/)[0]
  if (mt.funcList[funcName] == undefined) {
    return `METHOD '${funcName}' not found!`
  }
  let param = label.substr(funcName.length).trim()
  return mt.funcList[funcName](param)
}

function parse(content) {
  let match = content.match(labelReg)
  if (!match) { return content }
  let label = match[0].substr(2, match[0].length - 4)
  let start = match['index'], end = start + match[0].length
  let expanded = parseLabel(label)
  return parse(content.substr(0,start) + expanded + content.substr(end))
}

exports.parseLabel = parseLabel
exports.parse = parse