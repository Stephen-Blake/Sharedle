import CryptoJS from 'crypto-js'

class WordCreation {

  #state = {
    word: null,
    row: 0,
    single: 0,
    layout: [],
    difficulty: 'm'
  }

  constructor(
    word,
    row,
    difficulty,
    { e, m, h }
  ){

    let 
      wordDecode = null,
      rowCount = row
      
    const 
      wordValue = new URLSearchParams(window.location.search).get('w'),
      difficultyValue = new URLSearchParams(window.location.search).get('d'),
      
    difficultyData = { 
      e: e,
      m: m,
      h: h
     }

    if(
      wordValue
    ) wordDecode = CryptoJS.enc.Base64.parse(wordValue).toString(CryptoJS.enc.Utf8)

    if(
      !difficultyValue
    ) this.#state.difficulty = difficulty

    if(
      difficultyValue
    ){
      this.#state.difficulty = difficultyValue
      rowCount = difficultyData[difficultyValue]
      /*
      switch (difficultyValue) {
        case 'e':
          rowCount = e
        break;
        case 'm':
          rowCount = m
        break;
        case 'h':
          rowCount = h
        break;
        default:
          rowCount = row
          break;
      }
      */
    }

    this.#state.word = wordDecode ? wordDecode : word
    this.#state.row = rowCount - 1
    this.#state.single = [...this.#state.word].length - 1
    this.boardCreate()

  }

  async boardCreate(){
    for (var row = 0; row <= this.#state.row; row++) {
      this.#state.layout[row] = []
      this.#state.layout[row]['complete'] = false
      for (var length = 0; length <= this.#state.single; length++) {
        this.#state.layout[row][length] = {
          letter: null,
          checked: false,
          gold: false,
          green: false
        }
      }
    }
  }

  get difficulty() {
    return this.#state.difficulty
  }

  get layout() {
    return this.#state.layout
  }

  get rows() {
    return this.#state.row
  }
  
  get word() {
    return this.#state.word
  }

  get split() {
    return this.#state.word.split('')
  }

  get length() {
    return [...this.#state.word].length
  }

}

export default new WordCreation(
  process.env.REACT_APP_WORD, 
  process.env.REACT_APP_ROW_COUNT,
  process.env.REACT_APP_DIFFICULTY,
  {
    'e':process.env.REACT_APP_DIFFICULTY_E,
    'm':process.env.REACT_APP_DIFFICULTY_M,
    'h':process.env.REACT_APP_DIFFICULTY_H
  }
)