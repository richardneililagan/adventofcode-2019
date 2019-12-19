const fs = require('fs')
const readline = require('readline')

// :: ---

const __paramcodes = (opcode) => opcode.toString().split('').reverse().map(v => +v || 0)
const __read = (v, index, modes, ops) => {
  const mode = modes[v + 1] || 0
  const val = (mode === 0) ? (ops[ops[index + v]] || 0) : ops[index + v]
  return val
}
const __write = (v, index, modes, ops, val) => {
  const mode = modes[v + 1] || 0
  const idx = (mode === 0) ? (ops[index + v] || 0) : index + v
  ops[idx] = val
}

// :: ---

function __op1 (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)
  __write(3, index, PARAMCODES, ops, x + y)

  return 4
}

function __op2 (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)
  __write(3, index, PARAMCODES, ops, x * y)

  return 4
}

function __op3 (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const { input } = metadata
  __write(1, index, PARAMCODES, ops, input)

  return 2
}

function __op4 (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  metadata.output = x

  return 2
}

const OPERATIONS = [__op1, __op2, __op3, __op4]

// :: ---

function algorithm (filePath = '../../inputs/05/easy.input.txt') {
  const ops = []
  const metadata = {
    input: 1,
    output: null,
    index: 0
  }

  const task = new Promise((resolve) => {
    const stream = fs.createReadStream(filePath)
    const lines = readline.createInterface({
      input: stream,
      terminal: false
    })

    lines.on('line', (line) => {
      const digits = line.split(',').map(v => +v)
      ops.push(...digits)

      // :: TODO
    })

    lines.on('close', () => {
      const __recurse = () => {
        const op = ops[metadata.index] || 0
        const opcode = op - (~~(op / 100) * 100)

        if (opcode === 99) return resolve(metadata.output)
        // :: ---

        const operation = OPERATIONS[opcode - 1]
        const delta = operation(ops, metadata)
        metadata.index += delta

        __recurse()
      }

      __recurse()
    })
  })

  return task
}

// :: ---

module.exports = algorithm
