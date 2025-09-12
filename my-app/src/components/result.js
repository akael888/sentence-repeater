import { useState } from "react";
import css from "./results.module.css";
import CloseButton from "react-bootstrap/CloseButton";

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
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Handle potential errors (e.g., permission denied)
    }
  };

  return (
    <>
      {arrayResults ? (
        <>
          {arrayResults.length > 0 ? (
            <div className={css["results-container"]}>
              <div className={css["results-all-container"]}>
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
                <button>Test</button>
                <button>Test</button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default ShowResult;
