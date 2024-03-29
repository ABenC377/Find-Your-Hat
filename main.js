const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

class Field {
  constructor (field) {
    this._field = field
    this._playerLocation = [0, 0]
  }

  print () {
    for (let i = 0; i < this._field.length; i++) {
      let rowString = ''
      for (let j = 0; j < this._field[i].length; j++) {
        rowString += this._field[i][j]
      }
      console.log(rowString)
    }
  }

  win () {
    if (this._field[this._playerLocation[0]][this._playerLocation[1]] === hat) {
      return true
    } else {
      return false
    }
  }

  lose () {
    if ((this._playerLocation[0] < 0) || (this._playerLocation[0] >= this._field.length) || (this._playerLocation[1] < 0) || (this._playerLocation[1] >= this._field[0].length)) {
      return true
    } else if (this._field[this._playerLocation[0]][this._playerLocation[1]] === hole) {
      return true
    } else {
      return false
    }
  }

  getDirection () {
    const direction = prompt('Which way? ')
    let newPlayerLocation = this._playerLocation
    if (direction === 'u') {
      newPlayerLocation = [this._playerLocation[0] - 1, this._playerLocation[1]]
    } else if (direction === 'r') {
      newPlayerLocation = [this._playerLocation[0], this._playerLocation[1] + 1]
    } else if (direction === 'd') {
      newPlayerLocation = [this._playerLocation[0] + 1, this._playerLocation[1]]
    } else if (direction === 'l') {
      newPlayerLocation = [this._playerLocation[0], this._playerLocation[1] - 1]
    } else {
      console.log('please provide a valid direction (e.g., "u", "r", "d" or "l")')
      return true
    }
    this._playerLocation = newPlayerLocation
    if (this.lose()) {
      console.log('You Lose')
      return false
    } else if (this.win()) {
      console.log('You Win!!!')
      return false
    }
    this._field[this._playerLocation[0]][this._playerLocation[1]] = pathCharacter
    return true
  }

  playGame () {
    this.print()
    while (this.getDirection()) {
      this.print()
    }
  }

  static generateField (height, width, density) {
    const newField = []
    let hatCounter = Math.floor((Math.random() * ((height * width) - 1)) + 1)
    for (let i = 0; i < height; i++) {
      const newRow = []
      for (let j = 0; j < width; j++) {
        if ((i === 0) && (j === 0)) {
          newRow.push(pathCharacter)
        } else if (hatCounter === 0) {
          newRow.push(hat)
        } else {
          const randomHoleGenerator = Math.random()
          if (randomHoleGenerator > density) {
            newRow.push(fieldCharacter)
          } else {
            newRow.push(hole)
          }
        }
        hatCounter -= 1
      }
      newField.push(newRow)
    }
    return new Field(newField)
  }
}

function getHeight () {
  let height = Number(prompt('What height would you like your field to be? '))
  if ((height < 1) || (height > 50) || (isNaN(height))) {
    console.log('Height must be a number between 1 and 50')
    height = getHeight()
  }
  return height
}

function getWidth () {
  let width = Number(prompt('What width would you like your field to be? '))
  if ((width < 1) || (width > 100) || (isNaN(width))) {
    console.log('Width must be a number between 1 and 100')
    width = getWidth()
  }
  return width
}

function getDensity () {
  let density = Number(prompt('How dense would you like your field to be with holes? '))
  if ((density < 0) || (density > 1) || (isNaN(density))) {
    console.log('Density must be a number between 0 and 1')
    density = getDensity()
  }
  return density
}

console.log('Welcome to "Find Your Hat"')
console.log('You start in the top-left-hand corner of the field, and must find your hat')
console.log('move around the field using "u" (up), "r" (right), "d" (down) and "l" (left)')
console.log('and make sure that you do not fall down any of the holes')

const height = getHeight()
const width = getWidth()
const density = getDensity()

const gameField = Field.generateField(height, width, density)
gameField.playGame()
