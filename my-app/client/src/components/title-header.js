import { AnimatePresence } from "motion/react";
import Loading from "./loading-indicator";
import LogoutButton from "./logut-button";
import AuthButtons from "./auth-buttons";
import Burger from "./burger";
import { Link } from "react-router-dom";

function TitleHeader({
  darkModeTitle,
  darkModeChangesTitle,
  isOpen,
  handleOpenBurgerMenuChanges,
  incomingCurrentUser,
  incomingHandleCurrentUserChanges,
  incomingCurrentLink,
  incomingIsLoadingBackend,
  incomingHandleBackEndLoadingChanges,
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

        <div className="w-fit h-full flex justify-center items-center p-1">
          <Link to={"/"} style={{ display: "contents" }}>
            <img
              src="./logo512.png"
              alt="sentence-repeater-logo"
              className="h-auto w-[30px] p-1"
            ></img>
          </Link>
        </div>
        <div className="w-full h-full flex p-1 gap-3 justify-end">
          <div className="w-fit h-full flex justify-center items-center">
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
                  incomingHandleBackEndLoadingChanges={
                    incomingHandleBackEndLoadingChanges
                  }
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

export default TitleHeader;
