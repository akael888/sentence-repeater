import { motion } from "motion/react";

function Loading({}) {
  return (
    <>
      <motion.div
        className="max-w-100% h-auto flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "linear", duration: 0.5 }}
      >
        <motion.div className="w-[30px] h-[30px] flex justify-center items-center">
          <motion.img
            style={{ transformOrigin: "50% 50%" }}
            animate={{ rotate: 360 }}
            transition={{
              ease: "linear",
              duration: 2,
              repeat: Infinity,
            }}
            src="./svg/loading-white.svg"
            alt="Loading Logo"
            className="select-none"
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Loading;
