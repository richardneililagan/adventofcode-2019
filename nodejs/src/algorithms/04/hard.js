function __splitNumber (num) {
  const ret = num
    .toString()
    .split('')
    .map(v => +v)

  return ret
}

function __isAscending (digits) {
  const ret = digits.reduce((a, v, i) => {
    if (i === 0) return true
    // :: ---

    const previous = digits[i - 1]
    return a && (previous <= v)
  }, true)

  return ret
}

function __hasAdjacentDouble (digits) {
  const ret = digits.reduce((a, v, i) => {
    if (i === 0) return [[v]]
    // :: ---

    const currentGroup = a[a.length - 1]
    const currentDigit = currentGroup[0]

    if (currentDigit === v) currentGroup.push(v)
    else a.push([v])
    
    return a
  }, [])

  return ret.some(a => a.length === 2)
}

function algorithm () {
  const [min, max] = [206938, 679128]

  const analysis = Array(max - min + 1).fill(0)
    .map((_, i) => {
      const digits = __splitNumber(i + min)
      return digits
    })
    .map(digits => {
      return (
        __isAscending(digits) && 
        __hasAdjacentDouble(digits)
      )
    })
    .reduce((a, v) => {
      return v ? a + 1 : a
    }, 0)

  return Promise.resolve(analysis)
}

// :: ---

algorithm.__splitNumber = __splitNumber
algorithm.__isAscending = __isAscending
algorithm.__hasAdjacentDouble = __hasAdjacentDouble

module.exports = algorithm
