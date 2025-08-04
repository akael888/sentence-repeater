import { useState } from "react";
import css from "./generator.module.css";

function Generator({ variables, mainText, textArrayChanges }) {
  const [genAmount, setGenAmount] = useState(0);
  let textArray = [];

  function handleGenAmountChanges(amount) {
    setGenAmount(amount);
  }

  function generateText() {
    let genText = mainText.current.innerText;
    const newVariables = new Map();
    for (const [key, value] of variables.entries()) {
      newVariables.set(key, { ...value }); // Spread operator creates new object
    }
    let text = genText;
    console.log("Variables: " + variables);
    console.log("Main Text: " + genText);
    console.log("Gen Amount: " + genAmount);
    console.log("Text: " + text);
    console.log("Text Size: " + text.length);

    let currentKeyIndex = 0;

    for (let i = 0; i < genAmount; i++) {
      let text = genText;
      const variableEntries = Array.from(newVariables.entries());

      while (text.includes("{}") && variableEntries.length > 0) {
        const [key, value] =
          variableEntries[currentKeyIndex % variableEntries.length];
        text = text.replace("{}", String(value.value));

        if (value.iterate === true) {
          value.value++;
        }

        console.log(
          "Text: " + text + " (Variable Index: " + currentKeyIndex + ")"
        );
        currentKeyIndex++;
      }
      console.log("New Text: " + text);
      textArray.push(text);
    }
    // setGenAmount(0);
    // console.log("Break Text: " + text);
    textArrayChanges(textArray);
    return textArray;
  }

  // const breakMainText = (text) => {
  //   const splitText = text.split("{}");
  //   return splitText;
  // };

  return (
    <>
      <input
        id={css["amount-field"]}
        type="number"
        onChange={(e) => handleGenAmountChanges(e.target.value)}
        placeholder="Amount"
      ></input>
      <button
        id={css["generate-button"]}
        onClick={generateText}
        disabled={mainText.length > 0}
      >
        Generate
      </button>
    </>
  );
}

export default Generator;
