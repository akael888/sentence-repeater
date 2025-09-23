import { motion } from "motion/react";
import { useState } from "react";
import Toggle from "react-bootstrap/Form";

function BurgerMenu({ isOpen, darkModeChanges }) {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-0 right-0 w-[70%] h-screen bg-white z-[100] shadow-lg [&>*]:text-black flex flex-col justify-center gap-[10px]"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full h-auto">
        <motion.button
          className="w-full h-auto"
          onClick={() => setIsTutorialOpen(!isTutorialOpen)}
        >
          <h4>How to Use</h4>
        </motion.button>
        <motion.div
          className={
            (isTutorialOpen ? "h-auto w-full" : "hidden") + " p-2 [&>*]:text-sm"
          }
          initial={{ y: "100%" }}
          animate={{
            y: isTutorialOpen ? 0 : "100%",
            opacity: isTutorialOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <p>Write your Sentence in the Text Input</p>
          <p>Provide the Generate Amount</p>
          <p>Press Generate!</p>
          <p>Write "{"{}"}" to define a Variable in the Text Input.</p>
        </motion.div>
      </div>
      <div className="w-full h-auto flex flex-rows justify-center items-center text-center">
        <div>Dark Mode |</div>
        <Toggle>
          <Toggle.Check onChange={darkModeChanges} type="switch" />
        </Toggle>
      </div>
    </motion.div>
  );
}

export default BurgerMenu;
