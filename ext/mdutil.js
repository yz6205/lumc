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

function getMapItem(list, index) {
  index = index.trim().split('|')
  let current = list
  for (let id of index) {
    if (current[id]) {
      current = current[id]
    } else {
      return ""
    }
  }
  if (current instanceof Object) {
    current = Object.keys(current)
  }
  if (current instanceof Array) {
    current = current.join('\n')
  }
  return current
}

function getInfo(param) {
  try {
    param = param.trim()
    let key = param.split(/\s+/)[0]
    let cont = param.split(key).slice(1).join(key).split('---')[1]
    return getMapItem(yaml.parse(cont),key)
  } catch (err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
    return ""
  }
}

function yamlConfig(param) {
  try {
    param = param.trim()
    let key = param.split(/\s+/)[0]
    let cont = param.split(key).slice(1).join(key)
    return getMapItem(yaml.parse(cont),key)
  } catch (err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
    return ""
  }
}

let funcList = new Map()
funcList.set('MD', parseMd)
funcList.set('MDINFO', getInfo)
funcList.set('YAML', yamlConfig)
exports.funcList = funcList