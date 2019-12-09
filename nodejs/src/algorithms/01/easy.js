const fs = require('fs')
const readline = require('readline')

// :: ---

function __calculateFuel (mass) {
  const fuelRequired = Math.max(0, Math.floor(mass / 3) - 2)
  return fuelRequired
}

function algorithm (filePath = '../../inputs/01/easy.input.txt') {
  const task = new Promise((resolve) => {
    const fuelRequirements = []

    const stream = fs.createReadStream(filePath)
    const lines = readline.createInterface({
      input: stream,
      terminal: false
    })

    lines.on('line', (line) => {
      const fuelRequired = __calculateFuel(+line)
      fuelRequirements.push(fuelRequired)
    })

    lines.on('close', () => {
      const totalFuelRequired = fuelRequirements.reduce((a, v) => a + v, 0)
      resolve(totalFuelRequired)
    })
  })

  return task
}

module.exports = algorithm
