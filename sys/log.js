const pjson = require('../package.json')

module.exports = function (message, critical = false, debug = false) {
  const prefix = critical ? '[ERROR]' : debug ? '[DEBUG]' : '[INFO]'
  if (critical) { return console.error(`[${pjson.name}@${pjson.version}]`, `${prefix}`, message) } else { return console.log(`[${pjson.name}@${pjson.version}]`, `${prefix}`, message) }
}
