import WordCalculate from "../utils/WordCalculate"

const submitRow = ({ layout, row }) => new WordCalculate(layout, row)

const EventReducer = (state, action) =>  {

  switch (action.type) {
    case 'enter': {
      const submitted = submitRow(state)
      if(submitted.winner){
        return {
          ...state,
          won: true
        }
      }
      if(submitted.loser){
        return {
          ...state,
          lose: true
        }
      }
      return {
        ...state,
        space: 0,
        row: state.row + 1
      }
    }
    case 'backspace': {
      state.layout[state.row][state.space - 1].letter = null
      return {        
        ...state,
        space: (state.space > 0) ? state.space - 1 : 0
      }
    }
    case 'character': {
      if(
        !state.layout[state.row][state.space]
      ) {
        return {        
          ...state,
          space: state.space
        }
      }
      state.layout[state.row][state.space].letter = action.payload ? action.payload : null
      return {        
        ...state,
        space: state.space + 1
      }
    }
    case 'set': {
      if(!action.payload) return
      return {        
        ...action.payload,
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }

}

export default EventReducer;