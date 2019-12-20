const fs = require('fs')
const readline = require('readline')

// :: ---

const REGISTRY = {}

const __getPlanet = (key) => {
  const planet = REGISTRY[key]
  if (planet) return planet

  // :: planet does not exist yet
  REGISTRY[key] = __createPlanet(key)
  return REGISTRY[key]
}

const __createPlanet = (key) => {
  const planet = {
    key,
    value: 0,
    orbits: null,
    orbitals: []
  }

  return planet
}

const __createOrbit = (a, b) => {
  b.orbits = a
  a.orbitals.push(b)
}

const __traceroute = (key, length) => {
  const parent = __getPlanet(key).orbits
  if (!parent) return length
  else return __traceroute(parent.key, length + 1)
}

// :: ---

function algorithm (filePath = '../../inputs/06/easy.input.txt') {
  const task = new Promise((resolve) => {
    const input = fs.createReadStream(filePath)
    const lines = readline.createInterface({
      input,
      terminal: false
    })

    lines.on('line', (line) => {
      const [planetA, planetB] = line.split(')').map(__getPlanet)
      __createOrbit(planetA, planetB)
    })

    lines.on('close', () => {
      const keys = Object.keys(REGISTRY)
      const totalOrbits = keys.reduce((a, key) => {
        return a + __traceroute(key, 0)
      }, 0)

      resolve(totalOrbits)
    })
  })

  return task
}

module.exports = algorithm
