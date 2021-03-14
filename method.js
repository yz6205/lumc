"use strict"

const ut = require('./utility.js')

let funcList = {}

// built-in functions
funcList["NULL"] = ()=>""
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval


exports.funcList = funcList;