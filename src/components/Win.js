import Confetti from "react-confetti";
import React, {useState} from "react";

function Winner() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div
        className={`model winner ${toggle ? "open" : "close"}`}
        // onClick={() => setToggle(false)}
      >
        <Confetti />
        <div className="state-wrap">
          <div className="title-state">WINNER!</div>
        </div>
      </div>
    </>
  );
}

export default Winner;
