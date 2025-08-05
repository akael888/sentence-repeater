import { useState } from "react";
import css from "./results.module.css";
import CloseButton from "react-bootstrap/CloseButton";

function ShowResult({ arrayResults, arrayResultsChange }) {
  const rows = [];
  const [isCopied, setIsCopied] = useState(false);

  for (let i = 0; i < arrayResults.length; i++) {
    rows.push(
      <tr key={i}>
        <td>{arrayResults[i]}</td>
      </tr>
    );
    console.log("Text Array Results" + { arrayResults });
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
      const textToCopy = arrayResults.map(item => `- ${String(item)}`).join('\n');
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
      <div>
        <p>Sentence</p>
        <CloseButton
          onClick={() => {
            handeArrayResultsChanges();
          }}
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
      <div>
        <button onClick={handleCopyClick}>
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
}

export default ShowResult;
