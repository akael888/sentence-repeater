import "./App.css";
import { useEffect, useState } from "react";
import Repeater from "./components/repeater";
import Mode from "./components/toggle-mode";
import bg from "./img/background-img.jpg";
import { motion } from "motion/react";

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
    <div
      className="w-screen h-screen bg-center bg-repeat text-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={
          "h-[10%] min-h-[10vh] w-fullflex flex-col items-center justify-center font-[calc(10px_+_2vmin)] text-main-color  text-center z-[100]  sticky top-0" +
          tw_appHeader_glassMorphBG
        }
      >
        <TitleHeader
          darkModeTitle={isDarkMode}
          darkModeChangesTitle={handleDarkModeChanges}
        />
      </motion.header>
      <div className="w-screen h-[90%] flex flex-col justify-start items-start shrink-1 overflow-scroll overflow-x-hidden overflow-y-auto ">
        <div className="w-full h-auto grid place-items-center p-[5%]">
          <Repeater />
        </div>
      </div>
      <footer className="w-full h-[10%] bg-black"></footer>
    </div>
  );
}

function TitleHeader({ darkModeTitle, darkModeChangesTitle }) {
  return (
    <>
      <div className="w-full h-full grid content-center">
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
