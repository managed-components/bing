import { omitOne } from './utils'

describe('Testing utils for Bing', () => {
  it('Removes property from an object', () => {
    const payload = {
      foo: 'foo',
      baz: 'baz',
    }
    const clean = omitOne(payload, 'baz')
    const expected = {
      foo: 'foo',
    }
    expect(clean).toEqual(expected)
  })
})
