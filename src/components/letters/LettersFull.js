import React from "react"
import LettersRow from "./LettersRow"

function LettersFull({ state }) {
  
  const 
    lettersRow = [],
    { layout } = state

  layout.forEach((item, i) => {
    lettersRow.push(
     <LettersRow
       key = { i }
       state = { item }
     />
    )
  })

  return (
    <>
     <div className = 'lettersFull'>
       { lettersRow }
     </div>
    </>
  )

}

export default LettersFull
