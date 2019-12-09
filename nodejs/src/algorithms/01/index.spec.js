const algorithm = require('./index')

jest.mock('fs')

describe('Day 01 algorithm', () => {
  const MOCK_FILES = {
    '/sample/12': '12',
    '/sample/14': '14',
    '/sample/1969': '1969',
    '/sample/100756': '100756'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILES)
  })

  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  it('should calculate 2 fuel for 12 mass', async () => {
    await expect(algorithm('/sample/12')).resolves.toBe(2, '12 needs 2 fuel')
  })

  it('should calculate 2 fuel for 14 mass', async () => {
    await expect(algorithm('/sample/14')).resolves.toBe(2, '14 needs 2 fuel')
  })

  it('should calculate 654 fuel for 1969 mass', async () => {
    await expect(algorithm('/sample/1969')).resolves.toBe(654, '1969 needs 654 fuel')
  })

  it('should calculate 33583 fuel for 100756 mass', async () => {
    await expect(algorithm('/sample/100756')).resolves.toBe(33583, '100756 needs 33583 fuel')
  })
})
