import React from "react"

function LetterSingle({ state }) {
    
  return (
    <>
      <div
        className = { `letterSingle${state.checked === false ? '' : ' checked'}` }
        green = { state.green ? 'active' : '' }
        gold = { state.gold ? 'active' : '' }
      >
        { state.letter }
      </div>
    </>
  )

}

export default LetterSingle

/*
  return (
    <div
      className = 'letterSingle'
      green = { state.green ? 'active' : 'fail' }
      gold = { state.gold ? 'active' : 'fail' }
    >
      { state.letter }
    </div>
  )
  */