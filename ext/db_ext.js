"use strict"

const { db } = require('../db')

function CMD_GETS_START(start) {
  return Array.from(db.keys()).filter(x => x.startsWith(start)).join('\n')
}

let funcList = {}
funcList["GETS_START"] = CMD_GETS_START
exports.funcList = funcList
