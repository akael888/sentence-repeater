import { motion } from "motion/react";
import { useState } from "react";
import CustomToggle from "./toggle-custom";

function BurgerMenu({ isOpen, darkModeChanges,isDarkMode }) {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-0 right-0 w-[70%] lg:w-[30%] h-screen bg-white z-[100] shadow-lg [&>*]:text-black flex flex-col justify-center gap-[10px] z-[99]"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
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
            className="p-2 [&>*]:text-sm border-b border-gray-200 lg:[&>*]:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTutorialOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isTutorialOpen ? 0.1 : 0 }}
          >
            <p>Write your Sentence in the Text Input</p>
            <p>Provide the Generate Amount</p>
            <p>Press Generate!</p>
            <strong className="text-amber-600">
              <p>Write "{"{}"}" to define a Variable in the Sentence inside the Text Input</p>
            </strong>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full h-auto flex flex-row justify-center items-center text-center gap-2">
        <div>Dark Mode |</div>

        <CustomToggle onChange={darkModeChanges} checked={isDarkMode} ></CustomToggle>
      </div>
    </motion.div>
  );
}

export default BurgerMenu;
