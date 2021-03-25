"use strict"

const kramed = require('kramed')
const yaml = require('yaml')


function parseMd(content) {
  content = content.split('---')
  let result = [], enable = true
  for (let block of content) {
    if (enable) {
      result.push(block)
    }
    enable = !enable
  }
  return kramed(result.join(''))
}

function getInfo(param) {
  try {
    param = param.trim()
    let key = param.split(/\s+/)[0]
    let cont = param.split(key).slice(1).join(key).split('---')[1]
    return yaml.parse(cont)[key].toString().split(',').join('\n')
  } catch (err) {
    return ""
  }
}

let funcList = new Map()
funcList.set('MD', parseMd)
funcList.set('MDINFO', getInfo)
exports.funcList = funcList