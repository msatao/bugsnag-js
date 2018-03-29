const { describe, it, expect } = global

const stringify = require('../json-stringify')

describe('json stringify', () => {
  it('works with simple json', () => {
    const obj = {
      a: [ 1, 2, 3 ],
      b: { x: 'x', y: 'y', z: 'z' },
      c: null,
      d: new Date()
    }
    expect(stringify(obj)).toBe(JSON.stringify(obj))
  })

  it('works with circular JSON', () => {
    const obj = {}
    const a = {}
    obj.a = a
    obj.a.a = obj
    expect(stringify(obj)).toBe('{"a":{"a":"[Circular]"}}')
  })

  it('works with circular JSON in toJSON() return value', () => {
    const obj = {}
    obj.toJSON = function () {
      var a = {}
      a.a = a
      return a
    }
    expect(stringify(obj)).toBe('{"a":"[Circular]"}')
  })

  it('doesn’t omit repeated references which aren’t circular', () => {
    const a = { code: 'AA' }
    const obj = {
      things: [ a, a, a ]
    }
    expect(stringify(obj)).toBe('{"things":[{"code":"AA"},{"code":"AA"},{"code":"AA"}]}')
  })
})
