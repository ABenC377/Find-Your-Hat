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
    if (this._field[this._playerLocation[0]][this._playerlocation[1]] === hat) {
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
}
