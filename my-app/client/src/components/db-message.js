import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function DBMessage({ incomingMessage }) {
  const [dbMessageVisible, setDbMessageVisible] = useState(false);

  useEffect(() => {
    setDbMessageVisible(true);
    const dbMessageTimer = setTimeout(
      () => setDbMessageVisible(false),
      1000 * 5
    );
    return () => {
      clearTimeout(dbMessageTimer);
    };
  }, [incomingMessage]);

  return (
    <>
      <AnimatePresence>
        {incomingMessage && dbMessageVisible ? (
          <motion.div
            className="w-full h-fit bottom-0 sm:text-base text-sm p-2 absolute backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity:0}}
          >
            {incomingMessage[incomingMessage.length - 1]}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default DBMessage;
