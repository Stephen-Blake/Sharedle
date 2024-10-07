import React, {useState} from "react";
import CryptoJS from "crypto-js";

const errorObject = [
  {
    key: 'length',
    fn: word => word.length === 0 ? true : false,
    text: 'Cant Be Empty', 
    error: false
  },{
    key: 'longer',
    fn: word => word.length > 10 ? true : false,
    text: 'Cant Be Longer Than 12 Letters', 
    error: false
  },{
    key: 'letters',
    fn: word => /[^a-zA-Z]/.test(word) ? true : false,
    text: 'Letters Only', 
    error: false
  }
]

function wordGen(
  currentDifficulty, 
  currentWord
){
  return (
    difficulty,
    word
  ) => `${window.location.hostname}/Sharedle?w=${CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(word !== "" ? word : currentWord)
  )}&d=${difficulty !== "" ? difficulty : currentDifficulty}`
} // Updated to work with Git Pages

function CreateWord({wordRef, currentWord, currentDifficulty}) {
  const [word, setWord] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [copy, setCopy] = useState("");
  const [fail, setFail] = useState(false)
  const wordGenCurry = wordGen(currentDifficulty, currentWord)
  const [link, setLink] = useState(wordGenCurry(difficulty, word));
  // ! Linked with DIVS
  const [divs, setDivs] = useState(errorObject)

  /*
    const [validation, setValidation] = useState({
      letters: false,
      longer: false,
      empty: false,
    });
  */

  const handleSubmit = (event) => {

    event.preventDefault();

    /*
    setValidation({
      ...validation,
      ...Object.values(errorObject).map(fn => fn(word))
    });
    */

    setDivs(
      divs.map(d => {
        const error = d.fn(word)
        error ? d.error = true : d.error = false
        return {
          ...d,
          error
        }
      })
    )
    
    if (
      divs.map(data => data.error).includes(true)
    ) return setFail(true)

    setFail(false)

    setLink(
      wordGenCurry(difficulty, word)
    ) 
    
  };

  const copyText = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(link);
    setCopy(true);
  };

  /*
  // ! Prevent overuse of useEffect
  useEffect(() => {
    const values = Object.values(validation).includes(true);
    
    if (
      values === true
    ) return;

    setLink(
      `${window.location.hostname}?w=${CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(word !== "" ? word : currentWord)
      )}&d=${difficulty !== "" ? difficulty : currentDifficulty}`
    );
    // setLink(`${window.location.hostname}?word=${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(word? word : currentWord))}`)
  }, [validation]);
  */

  return (
    <>
      <div className="createWord">
        <div className="share">Share with Friends!</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Your Word</label>
            <input
              type="text"
              value={word}
              ref={wordRef}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <div>
            <label>Select Your Difficulty</label>
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty !== "" ? difficulty : currentDifficulty}
            >
              <option value="e">Easy</option>
              <option value="m">Medium</option>
              <option value="h">Hard</option>
            </select>
          </div>
          <div>
            <label>SHARE!</label>
            <input type="submit" />
          </div>
        </form>
        <div className={`error_wrap ${fail ? "active" : ""} `}>
          {Object.entries(divs).map(([k,d]) => 
            <span key={k} className={`error_true ${d.error ? "active" : "closed"} `}>
              {d.text}
            </span>
          )}
        </div>
        <div className={`shared ${fail ? "not-active" : "active"} `} onClick={copyText}>
          <span className={`is_copy ${copy ? "copied" : ""}`}>{copy ? "Copied" : ""}</span>
          {link}
        </div>
      </div>
    </>
  );
}

export default CreateWord;

/*

  <div className={`error_wrap ${validation.longer | validation.letters | validation.empty ? "active" : ""} `}>
      <span className={`nope_longer ${validation.longer ?? "active"} `}>
        Letters Only
      </span>
      <span className={`nope_letters ${validation.letters ?? "active"} `}>
        Can't Be Longer Than 12 Letters
      </span>
      <span className={`nope_empty ${validation.empty ?? "active"} `}>
        Can't Be Empty
      </span>
  </div>

  if(
    word.length === 0
  ) {
    setValidation({
      ...validation,
      empty: true
    })
  }

  if(
    word.length > 10
  ) {
    setValidation({
      ...validation,
      letters: true
    })
  }

  if (
    /[^a-zA-Z]/.test(word)
  ) {
    setValidation({
      ...validation,
      longer: true
    })
  }

*/

// window.location.replace(`http://localhost:3000?word=${link}`);
