import { motion } from "motion/react";

function Loading({}) {
  return (
    <>
      <motion.div className="w-full h-full">
        <motion.div className="w-[40px] h-[40px]">
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
