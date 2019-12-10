const algorithm = require('./hard')

jest.mock('fs')

describe('Day 02 algorithm - Part 2', () => {
  const MOCK_FILES = {
    '/sample/01': '1,0,0,0,99',
    '/sample/02': '2,3,0,3,99',
    '/sample/03': '2,4,4,5,99,0',
    '/sample/04': '1,1,1,4,99,5,6,0,99',
    '/sample/05': '1,9,10,3,2,3,11,0,99,30,40,50'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILES)
  })

  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  describe('__parseLine/1', () => {
    it('should return an array', () => {
      const result = algorithm.__parse([])
      expect(result).toBeInstanceOf(Array)
    })

    it('should correctly parse sample 01', () => {
      const input = MOCK_FILES['/sample/01'].split(',').map(v => +v)
      const result = algorithm.__parse(input)
      const expected = '2,0,0,0,99'.split(',').map(v => +v)

      expect(result).toEqual(expected)
    })


    it('should correctly parse sample 02', () => {
      const input = MOCK_FILES['/sample/02'].split(',').map(v => +v)
      const result = algorithm.__parse(input)
      const expected = '2,3,0,6,99'.split(',').map(v => +v)

      expect(result).toEqual(expected)
    })

    it('should correctly parse sample 03', () => {
      const input = MOCK_FILES['/sample/03'].split(',').map(v => +v)
      const result = algorithm.__parse(input)
      const expected = '2,4,4,5,99,9801'.split(',').map(v => +v)

      expect(result).toEqual(expected)
    })

    it('should correctly parse sample 04', () => {
      const input = MOCK_FILES['/sample/04'].split(',').map(v => +v)
      const result = algorithm.__parse(input)
      const expected = '30,1,1,4,2,5,6,0,99'.split(',').map(v => +v)

      expect(result).toEqual(expected)
    })

    it('should correctly parse sample 05', () => {
      const input = MOCK_FILES['/sample/05'].split(',').map(v => +v)
      const result = algorithm.__parse(input)
      const expected = '3500,9,10,70,2,3,11,0,99,30,40,50'.split(',').map(v => +v)

      expect(result).toEqual(expected)
    })
  })
})
