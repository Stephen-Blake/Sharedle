import React, {useState} from "react";
import Rainfall from "react-rainfall-animation/src/Rain";

function Lose() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div
        className={`model loser ${toggle ? "open" : "close"}`}
        /* onClick={() => window.location.reload()} */
        /* onClick={() => setToggle(false)} */
      >
        <div id="Rain">
          <Rainfall dropletsAmount={200} />
        </div>
        <div className='state-wrap'>
          <div className="title-state">
            LOSER!
          </div>
        </div>
      </div>
    </>
  );
}

export default Lose;
