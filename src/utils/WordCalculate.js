import WordCreation from "../utils/WordCreation"

class WordCalculate {

  count = -1
  instances
  countLetters = {}
  countObject = {}
  mappedObject = {}
  sortedObject = {}
  wordBreak = WordCreation.split
  wordLength = WordCreation.length
  wordRows = WordCreation.rows + 1
  winner
  loser

  constructor(
    layout, 
    row
  ){
    this.row = row
    this.layout = layout
    // Step 1
    this.#WordCalculateStepOne()
  }

  // Method Steps
  #WordCalculateStepOne() {

    // Map - Sentence
    this.layout[this.row].map(item => {

      // Index
      this.count++

      // Set row complete
      this.layout[this.row].complete = true

      this.#WordCalculatCount('countLetters', item)
      
      this.#WordCalculatInstances()

      // Return Object
      return this.mappedObject[this.count] = {
       'letter': item.letter,
       'count': this.countLetters[item.letter],
       'instances': this.instances[item.letter] ? (this.instances[item.letter]) : 0,
       'isGold': this.#WordCalculatIndex(item).includes(this.count),
       'isGreen': !this.#WordCalculatIndex(item).includes(this.count),
       'postion': this.count
      }

    })

    // Step 2
    this.#WordCalculateStepTwo()

  }

  #WordCalculateStepTwo() {

    let 
     initialValue = 0,
     occurrences

    occurrences = Object.values(this.mappedObject).reduce( (acc, curr) => (
      (curr.isGold === true) ? ++initialValue : initialValue
    ), initialValue);

    // WIN
    if(
      occurrences === this.wordLength
    ) {
      this.winner = true
    }

    // LOSE
    if(
      occurrences !== this.wordLength && 
      this.row + 1 >= this.wordRows
    ){
      this.loser = true
    }

    // Step 3
    this.sortedObject = 
      Object.entries(this.mappedObject).sort( (a, b) => a[1].isGreen - b[1].isGreen )
      this.#WordCalculateStepThree()

  }

  #WordCalculateStepThree() {

    this.countLetters = {}

    this.sortedObject.forEach( item => {
    
      // Deconstruct mappedObject
      const { letter, isGold, isGreen, postion, instances, count } = item[1]
  
      // Only If In Word
      if(
        !this.wordBreak.includes( letter )
      ) return
      
      // Count Again
      this.#WordCalculatCount('countObject', item[1])
        
      // If Gold
      if(
        isGold
      ){
        // Set to Gold
        this.layout[this.row][postion].gold = true;
      }
      
      // If Green
      if(
        isGreen 
        && instances >= this.countObject[letter]
      ){

        // Set to Green
        this.layout[this.row][postion].green = true;  
        // If Increment

        if(
          this.countObject[letter] < count
        ) this.countObject[letter]++

      } 
  
    })

  }

  // Method Helpers
  #WordCalculatCount(type, { letter }) {
    if(!this[type]) return
    // Count letters in Word
    this[type][letter] = 
      this[type][letter] ? (this[type][letter] + 1) : 1
  }

  #WordCalculatInstances() {
    // Instances in Word
    this.instances = this.wordBreak.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
  }

  #WordCalculatIndex(item) {
    // Location in Word
    return this.wordBreak.reduce(
      (acc, v, i) => (v === item.letter && acc.push(i), acc),
    []);
  }

}

export default WordCalculate