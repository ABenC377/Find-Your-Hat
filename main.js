const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

class Field {
  constructor (field) {
    this._field = field
  }

  print () {
    for (let i = 0; i < this._field.len(); i++) {
      for (let j = 0; j < this._field[i].len(); j++) {
        console.log(this._field[i][j])
      }
      console.log('\n')
    }
  }
}
