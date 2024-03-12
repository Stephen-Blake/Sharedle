import React from "react"

function KeyboardSingle({ letter, handler }) {
 
  const enterLetter = () => {
    handler({ 'key': letter })
  }
  
  return (
    <>
      <div
        className = 'keyboardSingle'
        onClick = { enterLetter }
      >
        { letter }
      </div>
    </>
  )

}

export default KeyboardSingle