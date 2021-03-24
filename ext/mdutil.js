"use strict"

const kramed = require('kramed')
const yaml = require('yaml')

let funcList = new Map()

function parseMd(content) {
  content = content.split('---')
  let result = [], enable = true
  for (let block of content) {
    if (enable) {
      result.push(block)
    }
    enable = !enable
  }
  return kramed(result.join(''))
}

funcList.set('MD', parseMd)

exports.funcList = funcList