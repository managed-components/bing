import { omitNullish } from './utils'

describe('Testing utils for Bing', () => {
  it('Removes null properties from an object', () => {
    const payload = {
      foo: 'foo',
      zero: 0,
      emptyStr: '',
      bool: false,
      nullish: null,
      anotherNullish: null,
      somethingUndefined: undefined,
    }
    const clean = omitNullish(payload)
    const expected = {
      foo: 'foo',
      zero: 0,
      emptyStr: '',
      bool: false,
    }
    expect(clean).toEqual(expected)
  })
})
