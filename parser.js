"use strict"

const labelReg = /{{[^{}]*}}/
const forReg = /<<[^<>]*>>\s*<</
const forRegMid = />>\s*<</

const mt = require('./method.js')
const log = console.error
// const log = function(){}

function replaceFor(content, match) {
  let bodyStart = match['index'] + match[0].length

  // find matching '>>'
  let forEnd = bodyStart
  let braceCnt = 0
  for (let i = bodyStart + 1; i < content.length; i++) {
    let check = content.substr(i, 2)
    if (check == '<<') {
      braceCnt++
    } else if (check == '>>') {
      if (braceCnt == 0) {
        forEnd = i
        break
      } else {
        braceCnt--
      }
    }
  }

  // split the string
  let prefix = content.substr(0,match['index'])
  let suffix = content.substr(forEnd + 2)
  let loops = content.slice(match['index']+2, forEnd)
  let loopSpliter = loops.match(forRegMid)
  let loopRange = loops.substr(0,loopSpliter['index']).trim()
  let loopBody = loops.substr(loopSpliter['index'] + loopSpliter[0].length).trim()

  let ranges = loopRange.split(' ')
  let loopId = ranges[0]
  ranges = ranges.slice(1)
  
  let result = []
  for (let s of ranges) {
    if (s != '') {
      result.push(loopBody.split(loopId).join(s)) 
    }
  }
  return prefix + result.join('\n') + suffix
}

function replaceLabel(content, match) {
  let label = match[0].substr(2, match[0].length - 4)
  let start = match['index'], end = start + match[0].length
  let funcName = label.match(/^\w*/)[0]
  let expanded = match[0]
  if (mt.funcList[funcName]) {
    let param = label.substr(funcName.length).trim()
    expanded = mt.funcList[funcName](param)
  }
  return content.substr(0,start) + expanded + content.substr(end)
}

function parse(content) {
  if (!content) {
    return ""
  }
  let matchFor = content.match(forReg)
  if (matchFor) {
    content = replaceFor(content, matchFor)
    return parse(content)
  }
  let matchLabel = content.match(labelReg)
  if (matchLabel) {
    content = replaceLabel(content, matchLabel)
    return parse(content)
  }
  return content
}

exports.parse = parse