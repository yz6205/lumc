"use strict"

const yaml = require('yaml')
const {} = require('../utility')

let yamlVars = new Object()

function getMapItem(list, index) {
  index = index.trim().split('|')
  let current = list
  for (let id of index) {
    id = id.trim()
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

function yamlSet(param) {
  let [key, cont] = param.trim().splitTwo(/\s+/)
  try {
    yamlVars[key] = yaml.parse(cont.split('\t').join('  '))
  } catch(err) {
    console.error(`Warning: parsing yaml failed: ${err['message']}`)
  }
  return ""
}

function yamlGet(param) {
  let [id, key] = param.trim().splitTwo(/\s+/)
  if (!yamlVars[id]) {
    console.error(`Warning: yaml config item '${id}' not found`)
    return ""
  }
  return getMapItem(yamlVars[id], key)
}

let funcList = new Map()
funcList.set('YAMLSET', yamlSet)
funcList.set('YAMLGET', yamlGet)
exports.funcList = funcList