import { motion } from "motion/react";

function Burger({ isOpen, handleOpenBurgerMenuChanges }) {
  return (
    <motion.button
      onClick={handleOpenBurgerMenuChanges}
      className="w-8 h-8 flex justify-center items-center relative [&>*]:bg-white z-[1000]"
    >
      <motion.span
        className="absolute block w-8 h-1 rounded-[5px]"
        animate={
          isOpen
            ? { rotate: 45, y: 0, backgroundColor: "black" }
            : { rotate: 0, y: -8, backgroundColor: "white" }
        }
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute block w-8 h-1 rounded-[5px]"
        animate={
          isOpen
            ? { opacity: 0, backgroundColor: "black" }
            : { opacity: 1, backgroundColor: "white" }
        }
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute block w-8 h-1 rounded-[5px]"
        animate={
          isOpen
            ? { rotate: -45, y: 0, backgroundColor: "black" }
            : { rotate: 0, y: 8, backgroundColor: "white" }
        }
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

export default Burger;
