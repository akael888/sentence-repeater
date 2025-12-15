import { useState } from "react";
import css from "./results.module.css";
import CloseButton from "react-bootstrap/CloseButton";
import { AnimatePresence, motion } from "motion/react";

function ShowResult({ arrayResults, arrayResultsChange }) {
  const rows = [];
  const [isCopied, setIsCopied] = useState(false);

  if (arrayResults) {
    for (let i = 0; i < arrayResults.length; i++) {
      rows.push(
        <motion.div
          key={i}
          className="w-full h-full p-[5px] grid text-center gap-[5px] pl-[10px] pr-[10px] "
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: Math.min(0.1 + i * 0.1, 5),
            ease: "easeInOut",
          }}
        >
          <td>{arrayResults[i]}</td>
        </motion.div>
      );
      console.log("Text Array Results" + { arrayResults });
    }
  }

  function handeArrayResultsChanges() {
    return arrayResultsChange(null);
  }

  // function iterateThroughRow() {
  //   let tempRow = rows;
  //   for (let i = 0; i < tempRow.length; i++) {
  //     tempRow[i] = convertArrayToPoints(tempRow[i]);
  //   }

  //   return
  // }

  // function convertArrayToPoints(specificArray) {
  //   specificArray = "- " + String(specificArray);
  //   return specificArray;
  // }

  const handleCopyClick = async () => {
    try {
      const textToCopy = arrayResults
        .map((item) => `- ${String(item)}`)
        .join("\n");
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Handle potential errors (e.g., permission denied)
    }
  };

  return (
    <>
      <AnimatePresence>
        {arrayResults ? (
          <>
            {arrayResults.length > 0 ? (
              <motion.div className="w-full h-full">
                <div className="w-full grid gap-[10px] place-items-stretch">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full sm:min-w-[20dvw]  min-h-[10vh] sm:max-w-[100dvw] max-h-[25vh] grid row-[2] row-start-auto text-center place-items-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[6px] backdrop-saturate-[120%]   grid z-0  m-auto rounded-[10px] "
                  >
                    <div className="w-full h-full grid p-[10px] place-items-center text-center">
                      <div className="w-full h-full p-[5px]">Results</div>
                    </div>
                    <div className=" w-full h-full text-center place-items-center overflow-y-auto grid m-auto rounded-t-none rounded-[10px] scrollbar scrollbar-thumb-white scrollbar-track-transparent">
                      {rows}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full text-center inline-flex flex-row gap-[5px] m-auto rounded-[10px]"
                  >
                    <motion.button
                      className="text-sm w-full h-full r rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[6px] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      onClick={handleCopyClick}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isCopied ? "✔ Copied!" : "⧉ Copy"}
                    </motion.button>
                    <CloseButton
                      onClick={() => {
                        handeArrayResultsChanges();
                      }}
                      whileTap={{ scale: 0.9 }}
                      variant="white"
                      className="w-full h-full"
                    />
                    {/* <button>Test</button>
                <button>Test</button> */}
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default ShowResult;
