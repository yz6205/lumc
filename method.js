"use strict"

const extPath = __dirname + '/ext/'

const ut = require('./utility.js')
const fs = require('fs')

function checkDirSync(filename) {
  let lastPath = filename.substr(0, filename.lastIndexOf('/'))
  fs.mkdirSync(lastPath, {recursive: true})
}

function writeTo(param) {
  param = param.trim()
  let dest = param.split(/\s+/)[0].trim()
  let cont = param.substr(dest.length)
  checkDirSync(dest)
  fs.writeFileSync(dest, cont)
  return ""
}

let funcList = new Map()

// built-in functions
funcList["NULL"] = ()=>""
funcList["ECHO"] = (s)=>s
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval
funcList["WRITE"] = writeTo

function installExtension() {
  let extList = []
  try {
    extList = fs.readdirSync(extPath) 
  } catch (err) {
    return
  }
  for (let filename of extList) {
    if (filename.endsWith('.js')) {
      const extObj = require(extPath + filename) 
      if (extObj.funcList instanceof Map) {
        extObj.funcList.forEach((value, key) => {
          if (value instanceof Function) {
            funcList[key] = value 
          }
        })
      } else if (extObj.funcList instanceof Object) {
        for (let [key, value] of Object.entries(extObj.funcList)) {
          if (value instanceof Function) {
            funcList[key] = value
          }
        }
      }
    }
  }
}

installExtension()

exports.funcList = funcList