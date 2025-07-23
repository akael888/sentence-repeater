import logo from "./logo.svg";
import "./App.css";
import "./TestFunction.js";
import Test from "./TestFunction.js";
import Click from "./buttonTest.js";
import Display from "./displayTest.js";
import { useState } from "react";

function App() {
  const [AApp, setAApp] = useState(0);
  function handleClick() {
    setAApp(AApp + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <Test />
          <Click count = {AApp} onClick = {handleClick} />
          <Display count = {AApp} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
