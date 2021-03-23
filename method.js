"use strict"

const ut = require('./utility.js')

let funcList = {}

// built-in functions
funcList["NULL"] = ()=>""
funcList["ECHO"] = (s)=>s
funcList["OPEN"] = ut.readFile
funcList["EVAL"] = eval


exports.funcList = funcList;