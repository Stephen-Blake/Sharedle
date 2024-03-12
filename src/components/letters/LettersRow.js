import React from "react"
import LetterSingle from "./LetterSingle"

function LettersRow({ state }) {
    
  const lettersSingle = []

  state.forEach((item, i) => {
    lettersSingle.push(
     <LetterSingle
      key = { i }
      state = { item }
     />
    )
  })

  return (
    <>
      <div className = { `lettersRow${!state.complete ? '' : ' complete'}` }>
        { lettersSingle }
      </div>
    </>
  )

}

export default LettersRow
