import React from "react"
import KeyboardRow from "./KeyboardRow"

function KeyboardFull({ handler }) {
  
  const 
    letters = {
      1: ['q', 'w', 'e', 'r', 't', 'y'],
      2: ['u', 'i', 'o', 'p', 'a', 's'],
      3: ['d', 'f', 'g', 'h', 'j', 'k'],
      4: ['l', 'z', 'x', 'c', 'v', 'b'],
      5: ['n', 'm', 'Backspace', 'Enter']
    },
    keyboardRow = []

  Object.entries(letters).forEach(
    (item) => {
      const [key, board] = item
      keyboardRow.push(
       <KeyboardRow
         key = { key }
         board = { board }
         handler = { handler }
       />
      )
    }
  )

  return (
    <>
      <div className = 'keyboardFull'>
        { keyboardRow }
      </div>
    </>
  )

}

export default KeyboardFull
