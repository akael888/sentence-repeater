import { motion } from "motion/react";
import { useState } from "react";
import CustomToggle from "./toggle-custom";
import SentenceCardManager from "./sentence-card-manager";

function BurgerMenu({
  isOpen,
  darkModeChanges,
  isDarkMode,
  incomingLink,
  incomingCurrentUser,
  incomingHandleBackEndLoadingChanges,
}) {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-0 right-0 w-[100%] lg:w-[30%] h-screen bg-amber-100 dark:!bg-stone-800  z-[100] shadow-lg [&>*]:text-stone-500  dark:[&>*]:!text-amber-200 flex flex-col justify-center gap-[10px] z-[99]"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {incomingCurrentUser ? (
        <SentenceCardManager
          incomingLink={incomingLink}
          incomingCurrentUser={incomingCurrentUser}
          incomingHandleBackEndLoadingChanges={
            incomingHandleBackEndLoadingChanges
          }
        ></SentenceCardManager>
      ) : (
        <>
          {/* Logo Sentence Repeater */}
          <div className="flex flex-row items-center justify-center">
            <img
              src="./logo512.png"
              alt="sentence-repeater-logo"
              className="w-[10%] h-auto"
            ></img>
          </div>

          {/* Help Sentence Repeater */}
          <div className="w-full h-auto">
            <motion.button
              className="w-full h-auto py-2 border-b border-gray-200"
              onClick={() => setIsTutorialOpen(!isTutorialOpen)}
            >
              <div className="w-full text-center flex justify-between items-center px-4">
                <h4 className="w-full">How to Use</h4>
                <motion.span
                  animate={{ rotate: isTutorialOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg text-opposite-color"
                >
                  ▼
                </motion.span>
              </div>
            </motion.button>

            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: isTutorialOpen ? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="p-5 [&>*]:text-sm border-b border-gray-200 lg:[&>*]:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTutorialOpen ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isTutorialOpen ? 0.1 : 0 }}
              >
                <p>Welcome to Sentence Repeater!</p>
                <p>Write your Sentence in the Text Input</p>
                <p>Provide the Generate Amount</p>
                <p>Press Generate!</p>
                <strong className="text-amber-600">
                  <p>
                    Write "{"{}"}" to define a Variable in the Sentence inside
                    the Text Input
                  </p>
                </strong>
              </motion.div>
            </motion.div>
          </div>

          {/* Dark Mode Repeater */}
          <div className="w-full h-fit flex flex-row justify-center items-center text-center gap-2">
            <div>Dark Mode |</div>

            <CustomToggle
              onChange={darkModeChanges}
              checked={isDarkMode}
            ></CustomToggle>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default BurgerMenu;
