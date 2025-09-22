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
      className="w-screen h-screen bg-center bg-repeat text-center flex flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={
          "h-[5%] min-h-[5vh] w-full flex flex-col items-center justify-center font-[calc(10px_+_2vmin)] text-main-color text-center z-[100] sticky top-0" +
          tw_appHeader_glassMorphBG
        }
      >
        <TitleHeader
          darkModeTitle={isDarkMode}
          darkModeChangesTitle={handleDarkModeChanges}
        />
      </motion.header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full flex flex-col">
          <div className="flex-1 w-full grid place-items-center p-[5%]">
            <Repeater />
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="w-full h-auto sm:h-[50%] bg-color-foreground mt-auto sm:p-[0] p-[2%]"
          >
            <div className="w-full h-auto sm:h-[50%] flex flex-col sm:flex-row p-[2%] sm:p-[1%] ">
              <div className="w-full grid place-items-center sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[10px] text-sub-color">
                <p className="text-sm">
                  Build with React, Tailwindcss, React Bootstrap, and Motion
                </p>
              </div>
              <div className="w-full grid place-items-center sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[10px] text-main-color">
                <p className="text-sm ">© 2025 - Elgratio Latuihamallo</p>
                <div className="w-fit h-fit sm:w-auto flex gap-[10px]">
                  <motion.a
                    href="https://www.linkedin.com/in/elgratiofc"
                    whileTap={{ scale: 0.9 }}
                    className="text-opposite-color no-underline hover:text-opposite-sub-color h-fit"
                  >
                    <strong>
                      <p className="text-sm">Linkedin</p>
                    </strong>
                  </motion.a>
                  <p className="text-sm">|</p>
                  <motion.a
                    href="https://github.com/akael888"
                    whileTap={{ scale: 0.9 }}
                    className="text-opposite-color no-underline hover:text-opposite-sub-color h-fit"
                  >
                    <strong>
                      <p className="text-sm">Github</p>
                    </strong>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

function TitleHeader({ darkModeTitle, darkModeChangesTitle }) {
  return (
    <>
      <nav className="flex justify-between items-center">
        <a href="/" class="logo">
          <img
            className="flex-shrink-0 w-auto h-full max-h-[5vh] object-contain "
            src="./logo512.png"
            alt="sentence-repeater-logo"
          />
        </a>
        {/* <Mode
          currentState={darkModeTitle}
          darkModeChanges={darkModeChangesTitle}
        /> */}
        {/* <ul className="flex justify-between items-center gap-[10px] w-full h-full">
          <li className="w-full h-full">
            <a href="/">How to Use</a>
          </li>
          
        </ul> */}
      </nav>
    </>
  );
}

export default App;
