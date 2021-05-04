"use strict"

const { funcList } = require("./method")
const {} = require("./utility")

function getParsePos(content) {
  let result = null
  let index = 0
  for (; index < content.length-1; index++) {
    let current = content.substr(index, 2)
    if (current == "[{") {
      result = new Object
      result["type"] = "label"
      break
    } else if (current == "<{") {
      result = new Object
      result["type"] = "loop"
      break
    }
  }
  if (!result) { return result }
  result["prefix"] = content.substr(0, index)
  index += 2
  if (result["type"] == "label") {
    let inLabelCnt = 1
    let innerStart = index
    for (; index < content.length-1; index++) {
      let current = content.substr(index, 2)
      if (current == "[{") { inLabelCnt++ }
      else if (current == "}]") { 
        inLabelCnt-- 
        if (inLabelCnt == 0) { 
          result["inner"] = content.slice(innerStart, index) 
          break
        }
      }
    }
  } else {
    let inBracketCnt = 1
    let rangeStart = index
    for (; index < content.length-1; index++) {
      let current = content.substr(index, 2)
      if (current == "<{") { inBracketCnt++ }
      else if (current == "}>") { 
        inBracketCnt-- 
        if (inBracketCnt == 0) {
          result["range"] = content.slice(rangeStart, index)
          break
        }
      }
    }
    index += 2
    inBracketCnt = 0
    for (; index < content.length-1; index++) {
      let current = content.substr(index, 2)
      if (current == "<{") {
        if (inBracketCnt == 0) { rangeStart = index + 2 }
        inBracketCnt++ }
      else if (current == "}>") { 
        inBracketCnt-- 
        if (inBracketCnt == 0) {
          result["body"] = content.slice(rangeStart, index)
          break 
        }
      }
    }
  }
  index += 2
  result["suffix"] = content.substr(index)
  return result
}

function treatLabel(content) {
  let inner = parse(content["inner"]).trim()
  let [funcName, param] = inner.splitTwo(/\s+/)
  if (funcList[funcName]) {
    return parse(funcList[funcName](param))
  } else {
    return `[{${inner}}]`
  }
}

function treatFor(content) {
  let range = parse(content["range"]).trim()
  let body = content["body"].trim()
  let [id, loopList] = range.splitTwo(/\s+/)
  loopList = loopList.split('\n')
  let result = []
  for (let value of loopList) {
    value = value.trim()
    if (value == "") { continue }
    result.push(parse(body.split(id).join(value)))
  }
  return result.join("\n")
}

function parse(content) {
  let pos = getParsePos(content)
  if (!pos) { return content }
  let replacement = ""
  if (pos["type"] == "label") {
    replacement = treatLabel(pos) 
  } else {
    replacement = treatFor(pos)
  }
  return pos["prefix"] + replacement + parse(pos["suffix"])
}

exports.parse = parse
