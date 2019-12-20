const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')

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

function ADDN (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)
  __write(3, index, PARAMCODES, ops, x + y)

  metadata.index += 4
}

function MULT (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)
  __write(3, index, PARAMCODES, ops, x * y)

  metadata.index += 4
}

function INPT (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const { input } = metadata
  __write(1, index, PARAMCODES, ops, input)

  metadata.index += 2
}

function OUTT (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  metadata.output = x

  metadata.index += 2
}

function JMPT (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const determinant = __read(1, index, PARAMCODES, ops)
  const target = __read(2, index, PARAMCODES, ops)

  if (determinant !== 0) metadata.index = target
  else metadata.index += 3
}

function JMPF (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const determinant = __read(1, index, PARAMCODES, ops)
  const target = __read(2, index, PARAMCODES, ops)

  if (determinant === 0) metadata.index = target
  else metadata.index += 3
}

function ISLT (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)

  const result = (x < y) ? 1 : 0
  __write(3, index, PARAMCODES, ops, result)

  metadata.index += 4
}

function ISEQ (ops, metadata) {
  const { index } = metadata
  const OPCODE = ops[index]
  const PARAMCODES = __paramcodes(OPCODE)

  const x = __read(1, index, PARAMCODES, ops)
  const y = __read(2, index, PARAMCODES, ops)

  const result = (x === y) ? 1 : 0
  __write(3, index, PARAMCODES, ops, result)

  metadata.index += 4
}

const OPERATIONS = [ADDN, MULT, INPT, OUTT, JMPT, JMPF, ISLT, ISEQ]

// :: ---

function algorithm (filePath = '../../inputs/05/easy.input.txt', input = 5) {
  const ops = []
  const metadata = {
    input,
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
    })

    lines.on('close', () => {
      const __recurse = () => {
        const op = ops[metadata.index] || 0
        const opcode = op - (~~(op / 100) * 100)

        if (opcode === 99) return resolve(metadata.output)
        // :: ---

        const operation = OPERATIONS[opcode - 1]
        operation(ops, metadata)

        __recurse()
      }

      __recurse()
    })
  })

  return task
}

// :: ---

module.exports = algorithm
