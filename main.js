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
    for (let i = 0; i < this._field.len(); i++) {
      for (let j = 0; j < this._field[i].len(); j++) {
        console.log(this._field[i][j])
      }
      console.log('\n')
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
    if (this._field[this._playerLocation[0]][this._playerLocation[1]] === hole) {
      return true
    } else if ((this._playerLocation[0] < 0) || (this._playerLocation[0] >= this._field.len()) || (this._playerLocation[1] < 0) || (this._playerLocation[1] >= this._field[0].len())) {
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
    this._field[this._playerLocation[0]][this._playerLocation[1]] = pathCharacter
    this._playerLocation = newPlayerLocation
    if (this.lose()) {
      console.log('You Lose')
      return false
    } else if (this.win()) {
      console.log('You Win!!!')
      return false
    }
    return true
  }

  playGame () {
    while (this.getDirection()) {
      this.print()
    }
  }

  static generateField (height, width, density) {
    if ((height < 1) || (height > 50) || (typeof (height) !== 'number')) {
      console.log('height must be a number between 1 and 50')
      return Field.generateField()
    }
    if ((width < 1) || (width > 50) || (typeof (width) !== 'number')) {
      console.log('width must be a number between 1 and 50')
      return Field.generateField()
    }
    if ((density < 0) || (density > 1) || (typeof (density) !== 'number')) {
      console.log('density must be a value between 0 and 1')
      return Field.generateField()
    }
    const newField = []
    let hatCounter = Math.floor((Math.random() * ((height * width) - 1)) + 1)
    for (let i = 0; i < height; i++) {
      const newRow = []
      for (let j = 0; j < width; j++) {
        if ((i === 0) && (j === 0)) {
          newRow.append(fieldCharacter)
        } else if (hatCounter === 0) {
          newRow.append(hat)
        } else {
          const randomHoleGenerator = Math.Random()
          if (randomHoleGenerator > density) {
            newRow.append(fieldCharacter)
          } else {
            newRow.append(hole)
          }
        }
        hatCounter -= 1
      }
      newField.append(newRow)
    }
    return new Field(newField)
  }
}
