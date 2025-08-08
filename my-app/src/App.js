import "./App.css";
import { useEffect, useState } from "react";
import Repeater from "./components/repeater";
import Mode from "./components/toggle-mode";

function App() {
  // Repeater Components
 
  const [isDarkMode, setIsDarkMode] = useState(false);

 

  const handleDarkModeChanges = (event) => {
    setIsDarkMode(!isDarkMode);
    console.log("Current Mode is : " + isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode === true) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="App">
      <header className="App-header">
        <TitleHeader
          darkModeTitle={isDarkMode}
          darkModeChangesTitle={handleDarkModeChanges}
        />
      </header>
      <div>
        <Repeater  />
      </div>
    </div>
  );
}

function TitleHeader({ darkModeTitle, darkModeChangesTitle }) {
  return (
    <>
      <div className="title-container">
        <h1>Sentence Repeater</h1>
        <Mode
          currentState={darkModeTitle}
          darkModeChanges={darkModeChangesTitle}
        />
      </div>
    </>
  );
}

export default App;
