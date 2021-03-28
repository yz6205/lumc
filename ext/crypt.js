"use strict"

require('../utility')
const CryptoJS = require("crypto-js")

let funcList = new Map()

function MD5(param) {
  return CryptoJS.MD5(param.trim()).toString()
}

function AES(param) {
  let [password, content] = param.splitTwo(/\s+/)
  let key = CryptoJS.enc.Utf8.parse(password);
  return CryptoJS.AES.encrypt(content, key, {iv: key}).toString()
}

funcList.set("MD5", MD5)
funcList.set("AES", AES)
exports.funcList = funcList