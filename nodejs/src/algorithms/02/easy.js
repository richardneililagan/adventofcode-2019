const fs = require('fs')
const readline = require('readline')

// :: ---

function __op1 (x, y) { return x + y }
function __op2 (x, y) { return x * y }

function __parseLine (ops = []) {
  __recurse(0, ops)
  return ops
}

function __recurse (index, ops = []) {
  const [code, op1index, op2index, resultIndex] = ops.slice(index, index + 4)
  if (code === 99 || !code) return ops

  // :: ---

  const operand1 = ops[op1index] || 0
  const operand2 = ops[op2index] || 0

  const operation = code === 1 ? __op1 : code === 2 ? __op2 : null
  if (!operation) throw new Error(`Unknown opcode at index ${index}: ${code}`)

  const result = operation(operand1, operand2)
  ops[resultIndex] = result

  return __recurse(index + 4, ops)
}

function algorithm (filePath = '../../inputs/02/easy.input.txt') {
  const task = new Promise((resolve) => {
    const ops = []

    const stream = fs.createReadStream(filePath)
    const lines = readline.createInterface({
      input: stream,
      terminal: false
    })

    lines.on('line', (line) => {
      const __ops = line.split(',').map(v => +v)
      ops.push(...__ops)

      ops[1] = 12
      ops[2] = 2

      algorithm.__parse(ops)
    })

    lines.on('close', () => {
      resolve(ops[0])
    })
  })

  return task
}

// :: ---

algorithm.__parse = __parseLine

module.exports = algorithm
