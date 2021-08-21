"use strict"

const child_process = require('child_process')

function shell(command) {
  return child_process.execSync(command).toString();
}

let funcList = {}
funcList["SH"] = shell
exports.funcList = funcList
