import { motion } from "motion/react";

function Chip({
  incomingVariableIndex,
  incomingChipList,
  incomingHandleVariableChanges,
}) {
  let tw_chip_glassMorphBG =
    " bg-[color-mix(in_srgb,var(--opposite-color)_50%,transparent)] backdrop-blur-[10px]";
  function removeChip(indexToRemove) {
    const removedList = incomingChipList.filter(
      (_, index) => index !== indexToRemove
    );
    incomingHandleVariableChanges(incomingVariableIndex, "list", removedList);
  }

  return (
    <>
      <>
        {incomingChipList != null
          ? incomingChipList.map((value, index) => (
              <>
                <motion.div
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  exit={{ x: -10 }}
                  className={`w-full h-full inline-flex items-center justify-center border-2 border-amber-600 rounded-[10px] ${tw_chip_glassMorphBG}   sm:gap-[5px]`}
                >
                  <motion.div
                    className={
                      "w-[70%] text-white text-sm sm:text-normal h-full p-[5px]"
                    }
                    
                  >
                    {value}
                  </motion.div>
                  <motion.button
                    onClick={(e) => removeChip(index)}
                    whileTap={{ scale: 0.9 }}
                    className="w-[30%] h-full text-white p-[5px] hover:text-amber-600 text-sm sm:text-normal"
                  >
                    ✕
                  </motion.button>
                </motion.div>
              </>
            ))
          : ""}
      </>
    </>
  );
}

export default Chip;
