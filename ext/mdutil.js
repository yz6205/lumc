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
  console.error(`Warning: deprecated method: "MDINFO", use "MDHEAD" instead`)
  try {
    let [key, cont] = param.trim().splitTwo(/\s+/)
    cont = cont.split('---')[1].split('\t').join('  ')
    return getMapItem(yaml.parse(cont),key)
  } catch (err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
    return ""
  }
}

function getMdHead(cont) {
  try {
    return cont.split('---')[1].split('\t').join('  ')
  } catch (err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
    return ""
  }
}

function mdexpand(param) {
  let [summary, detail] = param.splitTwo(/\s+/)
  let res = 
  `
<details>
<summary> <dt> ${summary} </dt> </summary>
  ${parseMd(detail)}
</details>
  `.trim()
  return res
}

let funcList = {}
funcList['MD'] = parseMd
funcList['MDINFO'] = getMdInfo
funcList['MDHEAD'] = getMdHead
funcList['MDEXPAND'] = mdexpand
exports.funcList = funcList
