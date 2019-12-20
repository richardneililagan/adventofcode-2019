const algorithm = require('./hard')

jest.mock('fs')

describe('Day 05 algorithm - Part 2', () => {
  const MOCK_FILES = {
    '/sample/01': '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
    '/sample/02': '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9',
    '/sample/03': '3,3,1105,-1,9,1101,0,0,12,4,12,99,1',
    '/sample/04': '3,9,8,9,10,9,4,9,99,-1,8',
    '/sample/05': '3,9,7,9,10,9,4,9,99,-1,8',
    '/sample/06': '3,3,1108,-1,8,3,4,3,99',
    '/sample/07': '3,3,1107,-1,8,3,4,3,99'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILES)
  })

  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  describe('Sample 01', () => {
    it('outputs 999 if input < 8', async () => {
      const input = 7
      const result = algorithm('/sample/01', input)

      await expect(result).resolves.toEqual(999)
    })

    it('outputs 1000 if input === 8', async () => {
      const input = 8
      const result = algorithm('/sample/01', input)

      await expect(result).resolves.toEqual(1000)
    })

    it('outputs 1001 if input > 8', async () => {
      const input = 10
      const result = algorithm('/sample/01', input)

      await expect(result).resolves.toEqual(1001)
    })
  })

  describe('Sample 02', () => {
    it('outputs 0 if input is 0', async () => {
      const input = 0
      const result = algorithm('/sample/02', input)

      await expect(result).resolves.toEqual(0)
    })

    it('outputs 1 if input is not 0', async () => {
      const input = 100
      const result = algorithm('/sample/02', input)

      await expect(result).resolves.toEqual(1)
    })
  })

  describe('Sample 03', () => {
    it('outputs 0 if input is 0', async () => {
      const input = 0
      const result = algorithm('/sample/03', input)

      await expect(result).resolves.toEqual(0)
    })

    it('outputs 1 if input is not 0', async () => {
      const input = 10000
      const result = algorithm('/sample/03', input)

      await expect(result).resolves.toEqual(1)
    })
  })

  describe('Sample 04', () => {
    it('outputs 1 if input is 8', async () => {
      const input = 8
      const result = algorithm('/sample/04', input)

      await expect(result).resolves.toEqual(1)
    })
  })
})
