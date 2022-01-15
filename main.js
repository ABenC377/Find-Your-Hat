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
      return false
    }
    this._field[this._playerLocation[0]][this._playerLocation[1]] = pathCharacter
    this._playerLocation = newPlayerLocation
    if (this.lose()) {
      console.log('You Lose')
      return true
    } else if (this.win()) {
      console.log('You Win!!!')
      return true
    }
    return false
  }
}
