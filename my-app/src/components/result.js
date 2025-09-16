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
        <tr key={i}>
          <td>{arrayResults[i]}</td>
        </tr>
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="w-full"
              >
                <div className="w-full grid gap-[10px] place-content-center">
                  <div className="w-full h-full min-w-[30vw] min-h-[10vh] max-w-[100vw] max-h-[25vh] grid row-[2] row-start-auto text-center place-items-center bg-[color-mix(in_srgb,var(--main-color)_20%,transparent)] backdrop-blur-[10px] border grid z-0 text-[white] m-auto rounded-[10px] border-solid border-[white]">
                    <div className={css["results-table-header-container"]}>
                      <h4 className="p-[5px]">Sentence</h4>
                      <CloseButton
                        onClick={() => {
                          handeArrayResultsChanges();
                        }}
                        variant="white"
                      />
                    </div>
                    <div className={css["results-table-container"]}>
                      <table>
                        <thead>
                          {/* <tr>
              <th>Sentence</th>
            </tr> */}
                        </thead>
                        <tbody>{rows}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className={css["results-interaction-container"]}>
                    <button className="w-full h-full" onClick={handleCopyClick}>
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                    {/* <button>Test</button>
                <button>Test</button> */}
                  </div>
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
