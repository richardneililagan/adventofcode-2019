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

const __traceroute = (planet) => {
  const parent = planet.orbits || null
  if (!parent) return [planet.key]
  else return [planet.key, ...__traceroute(parent)]
}

// :: ---

function algorithm (filePath = '../../inputs/06/easy.input.txt') {
  const task = new Promise((resolve, reject) => {
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
      const youRoute = __traceroute(__getPlanet('YOU'))
      const santaRoute = __traceroute(__getPlanet('SAN'))

      youRoute.forEach((key, i) => {
        const intersection = santaRoute.indexOf(key)
        if (intersection >= 0) {
          const totalJumps = (i + intersection) - 2
          resolve(totalJumps)
        }
      })

      reject('An intersection was not found.')
    })
  })

  return task
}

module.exports = algorithm
