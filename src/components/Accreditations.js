function Accreditations() {
  return (
    <>
      <div className="accreditations">
        <ul>
          <li>
            <a
              href="mailto:test@example.com?subject=Bug Found on Extension!"
              title="Bug Report!"
            >
              <img src="./bug-s.png" alt="bug"/>
            </a>
          </li>
          <li>
            <a href="https://madebystephen.fun" title="My Website!">
              <img src="./web-s.png" alt="website"/>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
// import './style.css';
export default Accreditations;