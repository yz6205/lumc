"use strict"

const extPath = __dirname + '/ext/'

const ut = require('./utility.js')
const fs = require('fs')

let funcList = new Map()

// built-in functions
funcList["NULL"] = ()=>""
funcList["ECHO"] = (s)=>s
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval

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