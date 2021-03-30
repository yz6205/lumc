"use strict"

const ut = require('./utility.js')
const { CMD_SET, CMD_GET } = require('./db.js')
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
funcList['LOG'] = function(param) { console.error(param); return "" }
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval
funcList["WRITE"] = writeTo
funcList["SET"] = CMD_SET
funcList["GET"] = CMD_GET

function installExtension(extPath) {
  let extList = []
  try {
    extList = fs.readdirSync(extPath) 
  } catch (err) { return }
  for (let filename of extList) {
    if (filename.endsWith('.js')) {
      const extObj = require(extPath + filename) 
      if (extObj.funcList) {
        for (let [key, value] of Object.entries(extObj.funcList)) {
          if (value instanceof Function) { funcList[key] = value }
        }
      }
    }
  }
}

installExtension(__dirname + '/ext/')
installExtension('theme/ext')

exports.funcList = funcList
