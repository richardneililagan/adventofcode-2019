const algorithm = require('./easy')

jest.mock('fs')

describe('Day 03 algorithm - Part 1', () => {
  const MOCK_FILES = {
    '/sample/01': `R75,D30,R83,U83,L12,D49,R71,U7,L72
                   U62,R66,U55,R34,D71,R55,D58,R83`,
    '/sample/02': `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
                   U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`,
    '/sample/03': `R8,U5,L5,D3
                   U7,R6,D4,L4`
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILES)
  })

  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  it('should parse sample 01 correctly', async () => {
    const result = algorithm('/sample/01')
    await expect(result).resolves.toEqual(159)
  })

  it('should parse sample 02 correctly', async () => {
    const result = algorithm('/sample/02')
    await expect(result).resolves.toEqual(135)
  })

  it('should parse sample 03 correctly', async () => {
    const result = algorithm('/sample/03')
    await expect(result).resolves.toEqual(6)
  })
})
