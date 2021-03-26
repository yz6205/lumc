"use strict"

const kramed = require('kramed')
const yaml = require('yaml')
const {} = require('../utility')

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
  if (current instanceof Array) {
    current = current.join('\n')
  } else if (current instanceof Object) {
    current = Object.keys(current).join('\n')
  }
  return current
}

function getMdInfo(param) {
  try {
    let [key, cont] = param.trim().splitTwo(/\s+/)
    cont = cont.split('---')[1].split('\t').join('  ')
    return getMapItem(yaml.parse(cont),key)
  } catch (err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
    return ""
  }
}

let funcList = new Map()
funcList.set('MD', parseMd)
funcList.set('MDINFO', getMdInfo)
exports.funcList = funcList