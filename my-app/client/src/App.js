// import "./App.css";
import { use, useEffect, useState } from "react";
import Repeater from "./components/repeater";
import Mode from "./components/toggle-mode";
import bg from "./img/background-img.jpg";
import { motion } from "motion/react";
import Burger from "./components/burger";
import BurgerMenu from "./components/burger-menu";
import WaveBackground from "./components/blob-background";
import LoginDebugger from "./components/login-form-debugger";
import Login from "./components/login-form";
import Register from "./components/register-form";
import Logout from "./components/logut-button";

function App() {
  //Backend Variables and Other Details
  const [sentenceDataTest, setSentenceDataTest] = useState();

  //Toggle Link
  const [linkCounter, setLinkCounter] = useState(1);
  const link = [
    "https://sentence-repeater-backend.vercel.app",
    "http://localhost:8000",
  ];
  const [currentLink, setCurrentLink] = useState(link[linkCounter]);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await fetch(`${currentLink}/api/v1/user/username`, {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.username);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    fetch("/api/v1/sentence").then((res) =>
      res.json().then((data) => setSentenceDataTest(data.sentence))
    );
  }, []);

  // Repeater Components

  //Dark Mode---------------------------------------------
  const [isDarkMode, setIsDarkMode] = useState(() => {
    //Check whether we already have a value in the local storage
    try {
      const stored = localStorage.getItem("IS_DARK_MODE");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.error("Failed to parse Dark Mode from localStorage:", err);
    }
    return true;
  });

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  // let tw_appHeader_glassMorphBG = " ";

  const handleDarkModeChanges = (event) => {
    setIsDarkMode(!isDarkMode);

    console.log("Current Mode is : " + isDarkMode);
  };

  const handleOpenBurgerMenuChanges = () => {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
  };

  const handleCurrentUserChanges = (newUser) => {
    setCurrentUser(newUser);
  };

  useEffect(() => {
    try {
      localStorage.setItem("IS_DARK_MODE", JSON.stringify(isDarkMode));
    } catch (err) {
      console.error("Failed to save dark mode to localStorage:", err);
    }

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    console.log("Dark mode is now:", isDarkMode);
  }, [isDarkMode]);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  return (
    <>
      <WaveBackground isDarkMode={isDarkMode}></WaveBackground>
      <div
        className="w-screen h-screen bg-center bg-cover text-center flex flex-col [&>*]:text-stone-500 [&>*]:border-stone-500 dark:[&>*]:!text-white dark:[&>*]:border-white [&>*]:font-inter"
        // style={{ backgroundImage: `url(${bg})` }}
      >
        {/* <div className="p-10 bg-white text-black dark:bg-black dark:text-white z-[100000]">
          Hello Dark Mode
        </div> */}

        <BurgerMenu
          isOpen={isOpenBurgerMenu}
          darkModeChanges={handleDarkModeChanges}
          isDarkMode={isDarkMode}
        ></BurgerMenu>
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className={
            "h-fit min-h-[5vh] w-full flex flex-col items-center justify-center font-[calc(10px_+_2vmin)] text-main-color text-center z-[100] sticky top-0"
            // +
            // tw_appHeader_glassMorphBG
          }
        >
          <TitleHeader
            darkModeTitle={isDarkMode}
            darkModeChangesTitle={handleDarkModeChanges}
            isOpen={isOpenBurgerMenu}
            handleOpenBurgerMenuChanges={handleOpenBurgerMenuChanges}
            incomingCurrentUser={currentUser}
            incomingHandleCurrentUserChanges={handleCurrentUserChanges}
            incomingCurrentLink={currentLink}
          />
        </motion.header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 w-full grid place-items-center p-[5%] z-[98]">
              <Repeater currentLink={currentLink} />
              <LoginDebugger
                currentLink={currentLink}
                incomingSetCurrentUser={handleCurrentUserChanges}
              ></LoginDebugger>
              <button
                onClick={() => {
                  setLinkCounter(linkCounter >= 1 ? 0 : linkCounter + 1);
                  console.log("linkcounter:", linkCounter);
                  setCurrentLink(link[linkCounter]);
                }}
                className="border-1 rounded-1 bg-purple-600 hover:bg-purple-300"
              >
                Change Link
              </button>
            </div>

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="w-full h-auto sm:h-[50%] bg-transparent mt-auto sm:p-[0] p-[2%] z-[98]"
            >
              <div className="w-full h-auto sm:h-[50%] flex flex-col sm:flex-row p-[2%] sm:p-[1%] ">
                <div className="w-full grid place-items-center text-opposite-color sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[10px] ">
                  <p className="text-sm">
                    Build with React, Tailwindcss, React Bootstrap, and Framer
                    Motion
                  </p>
                </div>
                <div className="w-full grid place-items-center sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[10px] text-white ">
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
    </>
  );
}

function TitleHeader({
  darkModeTitle,
  darkModeChangesTitle,
  isOpen,
  handleOpenBurgerMenuChanges,
  incomingCurrentUser,
  incomingHandleCurrentUserChanges,
  incomingCurrentLink,
}) {
  return (
    <>
      <nav className="w-full h-full sm:flex sm:justify-end items-center p-[10px] gap-3 flow-root">
        {/* <a href="/" class="logo">
          <img
            className="flex-shrink-0 w-auto h-full max-h-[5vh] object-contain "
            src="./logo512.png"
            alt="sentence-repeater-logo"
          />
        </a> */}
        <div className="w-fit h-fit sm:float-none float-left sm:flex sm:gap-1 sm:items-center">
          {incomingCurrentUser ? (
            <div className="flex gap-2 h-full">
              <div className="h-full p-1">Hi, {incomingCurrentUser}!</div>
              <Logout
                incomingHandleCurrentUserChanges={incomingHandleCurrentUserChanges}
                incomingCurrentLink={incomingCurrentLink}
              ></Logout>
            </div>
          ) : (
            <>
              <Register></Register>
              <Login></Login>
            </>
          )}
        </div>

        <div className="w-fit h-fit float-end sm:float-none">
          <Burger
            isOpen={isOpen}
            handleOpenBurgerMenuChanges={handleOpenBurgerMenuChanges}
          ></Burger>
        </div>

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
