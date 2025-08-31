import { useState } from "react";
import css from "./generator.module.css";

function Generator({
  incomingVariables,
  incomingPreviewText,
  incomingHandleGeneratedSentenceChanges,
}) {
  const [generatedSentenceAmount, setGeneratedSentenceAmount] = useState(0);

  function handleGeneratedSentenceAmountChanges(amount) {
    setGeneratedSentenceAmount(amount);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomfromList(sourceList) {
    const randomIndex = Math.floor(Math.random() * sourceList.length);
    return sourceList[randomIndex];
  }

  function generateSentence() {
    let tempPreviewText = incomingPreviewText;
    let localGeneratedSentence = [];
    const localVariables = new Map();

    // console.log("Main Text in Generate Text : " + incomingPreviewText);

    //Set the local variables into the incoming variables
    for (const [key, value] of incomingVariables.entries()) {
      localVariables.set(key, { ...value }); // Spread operator creates new object
    }
    // let text = tempPreviewText;

    //DEBUG LOG --------------------------------------------
    console.log("Generate Text () Log----------");
    console.log("incomingVariables: " + incomingVariables);
    console.log("Temp Preview Text: " + tempPreviewText);
    console.log("Temp Preview Text Size: " + tempPreviewText.length);
    console.log("Generated Sentence Amount: " + generatedSentenceAmount);
    // console.log("Text: " + text);
    console.log("-----------------------------");
    //-------------------------------------------

    //Generate the Sentences and pushes them into local generated sentence array
    let currentKeyIndex = 0;
    let tempFirstValue = null;
    let parsedText = [];
    for (let i = 0; i < generatedSentenceAmount; i++) {
      let tempText = tempPreviewText;

      console.log("PRE LOOP CONSOLE LOG-----");
      console.log("Text Pre Loop: " + tempText);
      console.log("TempPreviewText Pre Loop: " + tempPreviewText);
      const variableEntries = Array.from(localVariables.entries());

      while (tempText.includes("{}") && variableEntries.length > 0) {
        const [key, values] =
          variableEntries[currentKeyIndex % variableEntries.length];

        if (values.randomize === true) {
          console.log("minValue =" + values.minValue);
          values.value = getRandomInt(values.minValue, values.maxValue);
          console.log("values.value getrandomint =" + values.value);
        }
        if (values.type === "List") {
          if (i === 0) {
            parsedText = values.list;
            // parsedText = parsedText.split(",");
            console.log("Parsed Text: " + parsedText);
          }

          console.log("Text ke-" + i + ":" + parsedText[i]);
          values.value = parsedText[i];
        }

        if (values.randomize === true) {
          if (values.type === "Integer") {
            console.log("minValue =" + values.minValue);
            values.value = getRandomInt(values.minValue, values.maxValue);
            console.log("values.value getrandomint =" + values.value);
          }
          if (values.type === "List") {
            values.value = getRandomfromList(values.list);
          }
        }

        tempText = tempText.replace("{}", String(values.value));

        if (values.iterate === true) {
          values.value = parseInt(values.value) + parseInt(values.interval);
        }
        console.log(
          "Text: " + tempText + " (Variable Index: " + currentKeyIndex + ")"
        );
        console.log("Value Iterate? :" + values.iterate);

        currentKeyIndex++;
      }

      console.log("New Text: " + tempText);
      console.log("New tempPreviewText: " + tempPreviewText);
      localGeneratedSentence.push(tempText);
    }
    // setGeneratedSentenceAmount(0);
    // console.log("Break Text: " + text);
    //Passing the local generated sentence into the parent compoonents
    incomingHandleGeneratedSentenceChanges(localGeneratedSentence);
    console.log("GenerateSentence END OF LOG---------");
    return localGeneratedSentence;
  }

  // const breakincomingPreviewText = (text) => {
  //   const splitText = text.split("{}");
  //   return splitText;
  // };

  return (
    <>
      <div className={css["generator-container"]}>
        <input
          id={css["amount-field"]}
          type="number"
          onChange={(e) => handleGeneratedSentenceAmountChanges(e.target.value)}
          placeholder="Amount"
        ></input>
        <button
          id={css["generate-button"]}
          onClick={generateSentence}
          // disabled={incomingPreviewText.length > 0}
        >
          Generate
        </button>
      </div>
    </>
  );
}

export default Generator;
