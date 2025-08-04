
import "./App.css";
import {useState } from "react";
import Repeater from "./components/repeater";

function App() {
  // Repeater Components
  const [mainText, setMainText] = useState('Input your Text');



  const handleMainTextChange = (event) => {
    setMainText(event.target.value);
  };

 
  return (
    <div className="App">
      <header className="App-header">
        <TitleHeader />
      </header>
      <div>
        <Repeater mainTextChange={handleMainTextChange} />
      </div>
    </div>
  );
}

function TitleHeader() {
  return (
    <>
      <div className="title-container">
        <h1>Sentence Repeater</h1>
      </div>
    </>
  );
}

export default App;
