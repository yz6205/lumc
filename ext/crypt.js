"use strict"

require('../utility')
const CryptoJS = require("crypto-js")


function MD5(param) {
  return CryptoJS.MD5(param.trim()).toString()
}

function AES(param) {
  let [password, content] = param.splitTwo(/\s+/)
  let key = CryptoJS.enc.Utf8.parse(password);
  return CryptoJS.AES.encrypt(content, key, {iv: key}).toString()
}

function genPassword(param) {
  return CryptoJS.MD5(param.trim()).toString().substr(0,8)
}

let funcList = {}
funcList["MD5"] = MD5
funcList["AES"] = AES
funcList["GENPASSWD"] = genPassword
exports.funcList = funcList
