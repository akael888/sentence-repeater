import "./App.css";
import { useEffect, useState } from "react";
import Repeater from "./components/repeater";
import Mode from "./components/toggle-mode";

function App() {
  // Repeater Components

  const [isDarkMode, setIsDarkMode] = useState(false);
  let tw_appHeader_glassMorphBG =
    " bg-[color-mix(in_srgb,var(--color-foreground)_20%,transparent)] backdrop-blur-[10px]";

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
    <div className="w-screen h-screen text-center shrink-1">
      <header
        className={
          "min-h-[10vh] w-screen flex flex-col items-center justify-center font-[calc(10px_+_2vmin)] text-main-color absolute text-center" +
          tw_appHeader_glassMorphBG
        }
      >
        <TitleHeader
          darkModeTitle={isDarkMode}
          darkModeChangesTitle={handleDarkModeChanges}
        />
      </header>
      <div>
        <Repeater />
      </div>
    </div>
  );
}

function TitleHeader({ darkModeTitle, darkModeChangesTitle }) {
  return (
    <>
      <div className="w-full h-full">
        <h1>Sentence Repeater</h1>

        {/* <Mode
          currentState={darkModeTitle}
          darkModeChanges={darkModeChangesTitle}
        /> */}
      </div>
    </>
  );
}

export default App;
