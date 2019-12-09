const { Readable } = require('stream')

const fs = jest.genMockFromModule('fs')

// :: ---

let mockFiles = Object.create(null)

function __setMockFiles (newMockFiles) {
  mockFiles = newMockFiles
}

function createReadStream (filePath) {
  const stream = new Readable()
  stream._read = () => {} // :: https://stackoverflow.com/a/22085851

  const text = mockFiles[filePath] || ''
  stream.push(text)
  stream.push(null) // :: signal EOF

  return stream
}

function readFileSync (filePath, ...opts) {
  return mockFiles[filePath] || null
}

// :: ---

fs.__setMockFiles = __setMockFiles
fs.readFileSync = readFileSync
fs.createReadStream = createReadStream

module.exports = fs
