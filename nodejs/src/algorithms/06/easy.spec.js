const algorithm = require('./easy')

jest.mock('fs')

describe('Day 06 algorithm - Part 1', () => {
  const MOCK_FILES = {
    '/sample/01': `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`
  }

  beforeEach(() => require('fs').__setMockFiles(MOCK_FILES))

  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  it('should correctly parse sample 01', async () => {
    const result = algorithm('/sample/01')
    await expect(result).resolves.toEqual(42)
  })
})
