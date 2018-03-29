const { includes } = require('./es-utils')
module.exports = (obj) => {
  const seen = []
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (includes(seen, value)) return '[Circular]'
      seen.push(value)
      return value
    }
    return value
  })
}
