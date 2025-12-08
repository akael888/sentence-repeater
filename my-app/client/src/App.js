// import "./App.css";
import { use, useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react"; //Vercel Tracker
import { Analytics } from "@vercel/analytics/react";
import Repeater from "./components/repeater";
import Mode from "./components/toggle-mode";
import bg from "./img/background-img.jpg";
import { AnimatePresence, motion } from "motion/react";
import Burger from "./components/burger";
import BurgerMenu from "./components/burger-menu";
import WaveBackground from "./components/blob-background";
import LoginDebugger from "./components/login-form-debugger";
import Login from "./components/login-form";
import Register from "./components/register-form";
import LogoutButton from "./components/logut-button";

import { RepeaterDataProvider } from "./components/repeater-context";
import AuthActions from "./components/auth-actions";

import LoginPage from "./components/pages/login-page";
import { Link, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/pages/register-page";
import AuthButtons from "./components/auth-buttons";
import Loading from "./components/loading-indicator";

function App() {
  //Backend Variables and Other Details
  const [sentenceDataTest, setSentenceDataTest] = useState();

  const [isLoadingBackEnd, setIsLoadingBackEnd] = useState(false);

  //Toggle Link
  const [linkCounter, setLinkCounter] = useState(0);
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

  const handleBackEndLoadingChanges = (booleanValue) => {
    setIsLoadingBackEnd(booleanValue);
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

        <RepeaterDataProvider>
          <BurgerMenu
            isOpen={isOpenBurgerMenu}
            darkModeChanges={handleDarkModeChanges}
            isDarkMode={isDarkMode}
            incomingLink={currentLink}
            incomingCurrentUser={currentUser}
            incomingHandleBackEndLoadingChanges={handleBackEndLoadingChanges}
          ></BurgerMenu>
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={
              "sm:h-[5%] h-[10%] min-h-[5vh] w-full flex flex-col items-center justify-center font-[calc(10px_+_2vmin)] text-main-color text-center z-[100] sticky top-0"
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
              incomingIsLoadingBackend={isLoadingBackEnd}
            />
          </motion.header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex flex-col">
              <div className="flex-1 w-full grid place-items-center p-[5%] z-[98]">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Repeater
                          currentLink={currentLink}
                          incomingCurrentUser={currentUser}
                        />
                      </>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <LoginPage
                        incomingLink={currentLink}
                        incomingHandleCurrentUserChanges={
                          handleCurrentUserChanges
                        }
                        incomingCurrentUser={currentUser}
                        incomingHandleBackEndLoadingChanges={
                          handleBackEndLoadingChanges
                        }
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <RegisterPage
                        incomingCurrentLink={currentLink}
                        incomingHandleBackEndLoadingChanges={
                          handleBackEndLoadingChanges
                        }
                      />
                    }
                  />
                </Routes>

                {/* <LoginDebugger
                  currentLink={currentLink}
                  incomingHandleCurrentUserChanges={handleCurrentUserChanges}
                ></LoginDebugger> */}

                {/* <div>{currentLink}</div>
                <button
                  onClick={() => {
                    setLinkCounter(linkCounter >= 1 ? 0 : linkCounter + 1);
                    console.log("linkcounter:", linkCounter);
                    setCurrentLink(link[linkCounter]);
                  }}
                  className="border-1 rounded-1 bg-purple-600 hover:bg-purple-300"
                >
                  Change Link
                </button> */}
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
        </RepeaterDataProvider>
        <SpeedInsights />
        <Analytics />
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
  incomingIsLoadingBackend,
}) {
  return (
    <>
      <nav className="w-full h-full flex justify-end sm:flex sm:justify-end p-[10px] gap-3  ">
        {/* <a href="/" class="logo">
          <img
            className="flex-shrink-0 w-auto h-full max-h-[5vh] object-contain "
            src="./logo512.png"
            alt="sentence-repeater-logo"
          />
        </a> */}

        <div className="w-[10%] flex justify-start items-start p-1">
          <Link to={"/"} style={{ display: "contents" }}>
            <img
              src="./logo512.png"
              alt="sentence-repeater-logo"
              className="sm:w-[30px] h-auto w-[30px] p-1"
            ></img>
          </Link>
        </div>
        <div className="w-full h-full flex p-1 gap-3 justify-end">
          <div>
            <AnimatePresence>
              {incomingIsLoadingBackend ? <Loading /> : null}
            </AnimatePresence>
          </div>

          <div className="w-fit h-full flex sm:flex sm:gap-1 sm:items-center [&>*]:text-xs [&>*]:sm:text-base">
            {incomingCurrentUser ? (
              <div className="flex gap-2 h-full items-center justify-center">
                <div className="p-1 text-base ">
                  <i> Hi, {incomingCurrentUser}!</i>
                </div>
                <LogoutButton
                  incomingHandleCurrentUserChanges={
                    incomingHandleCurrentUserChanges
                  }
                  incomingCurrentLink={incomingCurrentLink}
                />
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>
          <div className="w-8 h-full  flex items-center">
            <Burger
              isOpen={isOpen}
              handleOpenBurgerMenuChanges={handleOpenBurgerMenuChanges}
            ></Burger>
          </div>
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
