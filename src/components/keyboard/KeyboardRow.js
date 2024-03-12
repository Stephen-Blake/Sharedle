import React from "react"
import KeyboardSingle from "./KeyboardSingle"

function KeyboardRow({ board, handler }) {
  
  const keyboardSingle = []

  board.forEach((item) => {
    keyboardSingle.push(
       <KeyboardSingle
         letter = { item }
         key = { item }
         handler = { handler }
       />
    )
  })

  return (
    <>
      <div className = 'keyboardRow'>
        { keyboardSingle }
      </div>
    </>
  )

}

export default KeyboardRow
