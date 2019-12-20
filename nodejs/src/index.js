const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const algorithmQuestion = {
  type: 'list',
  name: 'algorithm',
  message: 'Which algorithm do you want to run?',
  choices: [
    { value: '01', name: 'Day 01 - The Tyranny of the Rocket Equation' },
    { value: '02', name: 'Day 02 - 1202 Program Alarm' },
    { value: '03', name: 'Day 03 - Crossed Wires' },
    { value: '04', name: 'Day 04 - Secure Container' },
    { value: '05', name: 'Day 05 - Sunny with a Chance of Asteroids' },
    { value: '06', name: 'Day 06 - Universal Orbit Map' }
  ]
}

const inputsQuestions = {
  type: 'list',
  name: 'input',
  message: 'Which part?',
  default: 'easy',
  choices: [
    { value: 'easy', name: 'Part 1' },
    { value: 'hard', name: 'Part 2' }
  ]
}

let timer = process.hrtime()

inquirer
  .prompt([
    algorithmQuestion,
    inputsQuestions
  ])
  .then((answers) => {
    const { algorithm, input } = answers

    const __algorithm = require(`./algorithms/${algorithm}/${input}`)
    const __inputPath = path.resolve(__dirname, 'inputs', algorithm, `${input}.input.txt`)

    timer = process.hrtime()
    return __algorithm(__inputPath)
  })
  .then((result) => {
    const [seconds, nanos] = process.hrtime(timer)
    const elapsed = seconds + (nanos / 1000000000)

    console.log('')
    console.log(`The answer is ${chalk.bold.yellow(result)}.`)
    console.log(chalk.green(`Algorithm ran for ${chalk.bold.cyan(elapsed)} seconds.`))
    console.log('')
  })
