import { useState } from "react";

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
    const text = breakMainText(genText);
    console.log("Variables: " + variables);
    console.log("Main Text: " + genText);
    console.log("Gen Amount: " + genAmount);
    console.log("Break Main Text: " + text);
    console.log("Break Main Text Size: " + text.length);

    let currentKeyIndex = 0;
    
    for (let i = 0; i < genAmount; i++) {
      let newText = "";

      const variableEntries = Array.from(newVariables.entries());
      for (let j = 0; j < text.length; j++) {
        if (text[j] !== "") {
          console.log("New Text: " + newText + " Iteration" + i);
          newText = newText + text[j];
        } else {
          const [key, value] =
            variableEntries[currentKeyIndex % variableEntries.length];
          console.log("New Text Variable: " + newText + " Iteration" + i);
          console.log("Value: " + value.value);
          console.log("Variable ID: " + value.name);
          newText = newText + " " + String(value.value || "EMPTY");
          if (value.iterate === true) {
            value.value++;
          }
          currentKeyIndex++;
        }
      }
      console.log("New Text: " + newText);
      textArray.push(newText);
    }
    // setGenAmount(0);
    // console.log("Break Text: " + text);
    textArrayChanges(textArray);
    return textArray;
  }

  const breakMainText = (text) => {
    const splitText = text.split("{}");
    return splitText;
  };

  return (
    <>
      <input
        type="number"
        onChange={(e) => handleGenAmountChanges(e.target.value)}
      ></input>
      <button onClick={generateText}>Generate</button>
    </>
  );
}

export default Generator;
