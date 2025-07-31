
import "./App.css";
import {useState } from "react";
import Repeater from "./Repeater";

function App() {
  // Repeater Components
  const [mainText, setMainText] = useState('Input your Text');
  const [pText, setPText] = useState('Test');


  const handleMainTextChange = (event) => {
    setMainText(event.target.value);
  };

  const handlePTextChange = (event) => {
    setPText(event.target.innerText);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TitleHeader />
        <Repeater mainText={mainText} mainTextChange={handleMainTextChange} />
      </header>
      
    </div>
  );
}

function TitleHeader() {
  return (
    <>
      <div className="title-container">
        <h1>Variable Repeater</h1>
      </div>
    </>
  );
}

export default App;
