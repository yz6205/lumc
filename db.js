const {} = require('./utility')

let db = new Map()

function set(key, value) {
  if (value === false) { value = "false" }
  if (!value) { value = "" }
  db.set(key, value.toString())
}

function get(key) {
  let res = db.get(key)
  if (!res) { return "" }
  return res
}

function CMD_SET(param) {
  param = param.trim()
  let [key, value] = param.splitTwo(/\s+/)
  set(key, value.trim())
  return ""
}

function CMD_GET(param) {
  return get(param.trim())
}

function CMD_GETS_START(start) {
  return Array.from(db.keys()).filter(x => x.startsWith(start)).join('\n')
}

exports.set = set
exports.get = get
exports.CMD_SET = CMD_SET
exports.CMD_GET = CMD_GET
exports.CMD_GETS_START = CMD_GETS_START