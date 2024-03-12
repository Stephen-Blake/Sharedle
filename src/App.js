import './style.css';
import React, { useEffect, useReducer, useRef } from "react";

// Utils
import WordCreation from "./utils/WordCreation"

// Components
import KeyboardFull from "./components/keyboard/KeyboardFull"
import LettersFull from "./components/letters/LettersFull"
import CreateWord from "./components/CreateWord"

// Conditions
import Winner from "./components/Win"
import Loser from "./components/Lose"

// Misc.
import Accreditations from "./components/Accreditations"

// Reducer
import EventReducer from "./hooks/EventsReducer"

// App
function App() {

  const 
    { 
      layout, 
      word,
      difficulty
    } = WordCreation,
    wordBreak = WordCreation.split,
    NewWord = useRef(null)

  const 
    [state, dispatch] = useReducer(EventReducer, {
      row: 0,
      space: 0,
      layout: layout,
      won: false,
      lose: false
    });
  
  useEffect(() => {
    const saved = localStorage.getItem(`${word}_${difficulty}_state`)
    if(
      !saved
    ) return
    dispatch({type: 'set', payload: JSON.parse(saved)})
  },[])
  
  useEffect(() => {   
    localStorage.setItem(`${word}_${difficulty}_state`, JSON.stringify(state)) 
    // On Global Window Keypress
    window.addEventListener("keydown", keyHander);
    return () => window.removeEventListener("keydown", keyHander)
  })

  // KeyHander for Keyboard
  const keyHander = ({ key, keyCode }) =>  {

    if(
      NewWord.current === document.activeElement
    ) return

    if(
      state.won ||
      state.lose
    ) {
      return localStorage.setItem(`${word}_${difficulty}_state`, JSON.stringify({
        row: 0,
        space: 0,
        layout: layout,
        won: false,
        lose: false
      }))      
    }

    if(
      state.space > 0 &&
      key === 'Backspace'
    ) return dispatch({ type: 'backspace' })

    if(
      state.space >= wordBreak.length &&
      key === 'Enter'
    ) return dispatch({ type: 'enter' })

    if(
      state.space < wordBreak.length
    ) {
      if(
        (keyCode) 
          ? keyCode >= 65 && keyCode <= 90
          : key.charCodeAt() >= 97 && key.charCodeAt() <= 122
      ) return dispatch({ type: 'character', payload: key.toLowerCase() })
    }
   
  }

  return (
   <>
    <div className='top-wrap'>
      <div className='title'>
        Sharedle
      </div>
      <LettersFull
        state = { state } 
      />
    </div>
    <div className='bottom-wrap'>
      <KeyboardFull
        handler = { keyHander }
      />
      { state.won && <Winner />}
      { state.lose && <Loser /> }
      <CreateWord 
        wordRef={NewWord} 
        currentWord={word}
        currentDifficulty={difficulty}
      />
    </div>
    <Accreditations />
   </>
  );

}

export default App;