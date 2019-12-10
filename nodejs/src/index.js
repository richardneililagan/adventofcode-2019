const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const algorithmQuestion = {
  type: 'list',
  name: 'algorithm',
  message: 'Which algorithm do you want to run?',
  choices: [
    { value: '01', name: 'Day 01 - The Tyranny of the Rocket Equation' },
    { value: '02', name: 'Day 02 - 1202 Program Alarm' }
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

inquirer
  .prompt([
    algorithmQuestion,
    inputsQuestions
  ])
  .then((answers) => {
    const { algorithm, input } = answers

    const __algorithm = require(`./algorithms/${algorithm}/${input}`)
    const __inputPath = path.resolve(__dirname, 'inputs', algorithm, `${input}.input.txt`)

    return __algorithm(__inputPath)
  })
  .then((result) => {
    console.log('')
    console.log(`The answer is ${chalk.bold.yellow(result)}.`)
    console.log('')
  })
