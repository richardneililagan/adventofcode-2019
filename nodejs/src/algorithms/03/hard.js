const fs = require('fs')
const readline = require('readline')

// :: ---

const VECTORS = {
  U: ({ x, y }, d) => ({ x, y: y + d }),
  D: ({ x, y }, d) => ({ x, y: y - d }),
  L: ({ x, y }, d) => ({ x: x - d, y }),
  R: ({ x, y }, d) => ({ x: x + d, y })
}

function __parsePoints (line) {
  const vertices = [{ x: 0, y: 0 }]
  const vectors = line.trim().split(',')

  vectors.forEach(vector => {
    const { x, y } = vertices[vertices.length - 1]
    const [head, ...tail] = vector
    const d = +tail.join('')

    const newBearing = VECTORS[head]({ x, y }, d)
    vertices.push(newBearing)
  })

  return vertices
}

function __determineIntersections ([ wire1, wire2 ]) {
  const intersections = []

  let steps1 = 0
  let steps2 = 0

  wire1.forEach((p1, i) => {
    const p2 = wire1[i + 1]
    if (!p2) return
    // :: ---

    steps2 = 0
    wire2.forEach((q1, j) => {
      const q2 = wire2[j + 1]
      const incrementSteps = (p,q) => {
        if (p.x === q.x) steps2 += (Math.max(p.y, q.y) - Math.min(p.y, q.y))
        else steps2 += (Math.max(p.x, q.x) - Math.min(p.x, q.x))
      }

      if (!q2) return 
      // :: ---
      
      // :: checks for parallel overlaps
      //    (as opposed to perpendicular ones)
      if (p1.x === p2.x && q1.x === q2.x) return incrementSteps(q1, q2)
      if (p1.y === p2.y && q1.y === q2.y) return incrementSteps(q1, q2)

      // :: this assumes that lines are only ever horizontal or vertical
      //    and never diagonal
      const x = (p1.x === p2.x) ? p1.x : q1.x
      const y = (p1.x === p2.x) ? q1.y : p1.y

      // :: origin point does not count
      if (x === 0 && y === 0) return incrementSteps(q1, q2)

      // :: it's an intersection if the projected point is within each pair
      //    of points' interval
      const isIntersection = (
        x >= Math.min(p1.x, p2.x) && x <= Math.max(p1.x, p2.x) &&
        x >= Math.min(q1.x, q2.x) && x <= Math.max(q1.x, q2.x) &&
        y >= Math.min(p1.y, p2.y) && y <= Math.max(p1.y, p2.y) &&
        y >= Math.min(q1.y, q2.y) && y <= Math.max(q1.y, q2.y)
      )

      // if (isIntersection) intersections.push({ x, y, steps: i + j + 2 })
      if (isIntersection) {
        const delta1 = (p1.x === p2.x) ? 
          (Math.max(p1.y, y) - Math.min(p1.y, y)) : 
          (Math.max(p1.x, x) - Math.min(p1.x, x))

        const delta2 = (q1.x === q2.x) ?
          (Math.max(q1.y, y) - Math.min(q1.y, y)) :
          (Math.max(q1.x, x) - Math.min(q1.x, x))

        intersections.push({ x, y, steps: steps1 + steps2 + delta1 + delta2 })
      }
      
      // :: increment steps
      incrementSteps(q1, q2)
    })

    // :: increment steps
    if (p1.x === p2.x) steps1 += (Math.max(p1.y, p2.y) - Math.min(p1.y, p2.y))
    else steps1 += (Math.max(p1.x, p2.x) - Math.min(p1.x, p2.x))
  })

  return intersections
}

function __manhattan ({ x, y }) {
  return Math.abs(x) + Math.abs(y)
}

function algorithm (path = '../../inputs/03/hard.input.txt') {
  const task = new Promise((resolve) => {
    const vertices = []

    const stream = fs.createReadStream(path)
    const lines = readline.createInterface({
      input: stream,
      terminal: false
    })

    lines.on('line', (line) => {
      const wireVertices = __parsePoints(line)
      vertices.push(wireVertices)
    })

    lines.on('close', () => {
      const intersections = __determineIntersections(vertices)
        .sort((a, b) => a.steps - b.steps)

      const shortestDistance = (intersections[0] || {}).steps

      resolve(shortestDistance || 0)
    })
  })

  return task
}

module.exports = algorithm
