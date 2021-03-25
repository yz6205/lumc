"use strict"

const extPath = './ext/'

const ut = require('./utility.js')
const fs = require('fs')
const { getUnpackedSettings } = require('http2')

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
      if (extObj.funcList) {
        extObj.funcList.forEach((value, key) => {
          funcList[key] = value 
        })
      }
    }
  }
}

installExtension()

exports.funcList = funcList