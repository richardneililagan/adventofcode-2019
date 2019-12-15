const algorithm = require('./hard')

// :: ---

describe('Algorithm 04 - Part 1', () => {
  it('should be a function', () => {
    expect(algorithm).toBeInstanceOf(Function)
  })

  describe('__splitNumber/1', () => {
    it('should split a number into digits', () => {
      const input = '111111'
      const output = algorithm.__splitNumber(input)

      expect(output).toEqual([1, 1, 1, 1, 1, 1])
    })
  })

  describe('__isAscending/1', () => {
    it('should be true if ascending', () => {
      const input = [1, 2, 2, 3, 4, 4, 5]
      const output = algorithm.__isAscending(input)

      expect(output).toBeTruthy()
    })

    it('should be true if flat', () => {
      const input = [1, 1, 1, 1, 1]
      const output = algorithm.__isAscending(input)

      expect(output).toBeTruthy()
    })

    it('should be false if descending', () => {
      const input = [1, 2, 3, 3, 4, 4, 3]
      const output = algorithm.__isAscending(input)

      expect(output).toBeFalsy()
    })
  })

  describe('__hasAdjacentDouble/1', () => {
    it('should be true if there is a double', () => {
      const input = [1, 2, 2, 3]
      const output = algorithm.__hasAdjacentDouble(input)

      expect(output).toBeTruthy()
    })

    it ('should be false if there is no double', () => {
      const input = [1, 2, 3, 4]
      const output = algorithm.__hasAdjacentDouble(input)

      expect(output).toBeFalsy()
    })

    it ('should not count groups larger than 2 digits', () => {
      const input = [1, 1, 1, 2]
      const output = algorithm.__hasAdjacentDouble(input)

      expect(output).toBeFalsy()
    })

    it ('should count doubles even if there are larger groups', () => {
      const input = [1, 1, 1, 1, 2, 2]
      const output = algorithm.__hasAdjacentDouble(input)

      expect(output).toBeTruthy()
    })
  })
})
